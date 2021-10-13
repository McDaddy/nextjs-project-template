import React from 'react';
import { isFunction, isNil, omitBy } from 'lodash';
import { useSetState, useUnmount, useIntersection, useMount, useUpdateEffect } from 'react-use';
import { EmptyHolder } from 'src/common';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

type ResetFn = () => void;

type UpdatePartFn<U> = (patch: U | Function) => void;
type UpdateFn<T> = (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void;

type UpdaterFn<T> = {
  [K in keyof T]: UpdatePartFn<T[K]>;
};

/**
 * 状态更新
 * @param initState 初始状态
 * @return [state, updateAll, updater]
 */
export const useUpdate = <T extends object>(
  initState: NullableValue<T>,
): [NullableValue<T>, UpdaterFn<NullableValue<T>>, UpdateFn<NullableValue<T>>, ResetFn] => {
  const [state, _update] = useSetState<NullableValue<T>>(initState || {});
  // 使用ref，避免updater的更新方法中，在闭包里使用上次的state
  const ref = React.useRef(state);
  const updateRef = React.useRef(_update);
  ref.current = state;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = React.useCallback((args: any) => {
    // 扩展 update 的使用, 使用方法同 useState((preState) => preState + 1)
    if (isFunction(args)) {
      return updateRef.current((prev) => args(prev));
    } else {
      return updateRef.current(args);
    }
  }, []);

  const updater = React.useMemo(() => {
    const result = {} as unknown as UpdaterFn<NullableValue<T>>;
    Object.keys(ref.current).forEach((k) => {
      result[k] = (patch: Function | unknown) => {
        const newPart = patch instanceof Function ? patch(ref.current[k], ref.current) : patch;
        ref.current[k] = newPart;
        return updateRef.current({ [k]: newPart } as Partial<NullableValue<T>>);
      };
    });
    return result;
  }, []);
  const reset = React.useCallback(() => updateRef.current(initState), [initState]);

  useUnmount(() => {
    updateRef.current = () => {};
  });

  return [state, updater, update, reset];
};

export function useLoadMoreScroll({
  load,
  paging,
  lazy,
  loading,
}: {
  load: (pageNo: number) => void;
  loading: boolean;
  paging: IPaging;
  lazy?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const loadRef = React.useRef(load);
  const [nextPageNo, setNextPageNo] = React.useState(1);
  const [currentPageNo, setCurrentPageNo] = React.useState(1);

  const resetPage = () => {
    setNextPageNo(1);
    setCurrentPageNo(1);
  };

  const curRef = React.useRef(resetPage);

  React.useImperativeHandle(loadRef, () => load);
  React.useImperativeHandle(curRef, () => resetPage);

  const intersection = useIntersection(ref, { root: null, rootMargin: '0px', threshold: 1 });

  useMount(() => {
    if (!lazy) {
      load(1);
    }
  });

  useUpdateEffect(() => {
    if (!intersection || !paging.hasMore) {
      return;
    }
    if (intersection.intersectionRatio === 1 && nextPageNo === paging.pageNo + 1 && nextPageNo > currentPageNo) {
      // placeholder在可视范围内， 且当前hasMore为true代表可以继续加载，且当前的pageNo必须是nextPage的上一页
      loadRef.current(nextPageNo);
      setCurrentPageNo(nextPageNo);
    } else if (nextPageNo === paging.pageNo) {
      // 此时表示，当前paging已经达到了nextPage，需要判断下是否可以下拉，当且仅当nextPageNo大于paging时才能下拉
      if (intersection.intersectionRatio < 1) {
        // placeholder在不可视范围内，且nextPageNo和当前paging相同，说明可以触发loadMore， 假设nextPageNo > paging说明当前load还没执行完，不满足再拉下一页的要求
        // 此处必须在intersection.intersectionRatio < 1时触发setNextPage是因为，如果在load函数执行后直接set，会导致渲染list未完成重复触发load
        setNextPageNo(nextPageNo + 1);
      } else {
        // 这里是为了处理resize和首屏高度太高的问题， 当整个list都在可视区域，表示此时需要自动的加载下一页
        setTimeout(() => {
          // 为什么必须setTimeout, 因为当paging更新，list也会同时更新，此时列表还没渲染完成，如果将nextPageNo + 1,那么此时我们的placeholder还在可视范围内，这样就会错误得触发fetch，
          // 此时添加一个宏任务，在渲染结束后，也许placeholder已经进入非可视区域。 那就不需要fetch了
          setNextPageNo(nextPageNo + 1);
        });
      }
    }
  }, [intersection, paging.hasMore, paging.pageNo, nextPageNo, currentPageNo]);

  return {
    loadMoreHolder: (
      <>
        {paging.total === 0 && !loading && <EmptyHolder />}
        {loading && (
          <Spin tip="正在加载更多数据...">
            <div className="min-h-[60px]" />
          </Spin>
        )}
        <div className="h-px" ref={ref} />
      </>
    ),
    resetPage: curRef.current,
  };
}

export const useUpdateSearch = () => {
  const router = useRouter();

  const updateSearch = React.useCallback(
    (newQuery: Obj) => {
      const _newQuery = {};
      for (const k in newQuery) {
        if (typeof newQuery[k] === 'number') {
          _newQuery[k] = `${newQuery[k]}`;
        } else {
          _newQuery[k] = newQuery[k];
        }
      }
      const _query = {
        ...router.query,
        ..._newQuery,
      };
      router.replace({
        query: omitBy(_query, (v: string | number) => {
          return isNil(v) || v === '';
        }),
      });
    },
    [router],
  );

  return updateSearch;
};
