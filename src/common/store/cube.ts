import cube from 'cube-state';
import { getConfig } from './config';

const defaultPaging = {
  pageNo: 1,
  pageSize: 15,
  total: 0,
};

const { createStore, createFlatStore, use, storeMap } = cube({
  singleton: true,
  extendEffect({ update, select }) {
    return {
      async call(fn: Function, payload: Obj = {}, config = {} as Obj) {
        const { paging, successMsg, errorMsg, fullResult } = config;
        const pagingKey = paging && paging.key;
        const listKey = paging && paging.listKey;
        const pageNoKey = paging && paging.pageNoKey;

        // save as request key for later abort
        let _payload = payload;
        if (pagingKey) {
          const curPaging = select((s) => s[pagingKey]); // current paging
          const pageNo = +(payload.pageNo || paging.pageNo || defaultPaging.pageNo);
          const pageSize = +(payload.pageSize || paging.pageSize || curPaging.pageSize || defaultPaging.pageSize);
          _payload = { ...payload, pageNo, pageSize };
        }
        const result = await fn(_payload);
        const keys = Object.keys(result || {});
        // RAW Response
        if (keys.includes('success') && (keys.includes('err') || keys.includes('data'))) {
          const { success, data, err, userInfo } = result;
          if (storeMap.coreUserMap && userInfo) {
            storeMap.coreUserMap.reducers.setUserMap(userInfo);
          }
          if (success) {
            if (successMsg) {
              getConfig('onAPISuccess')?.(successMsg);
            }
            if (pagingKey && data && 'total' in data && ('list' in data || listKey in data)) {
              listKey && (data.list = data[listKey]); // 设置了listKey时，复制一份到list上
              data.list = data.list || [];
              const currentPageNo = pageNoKey ? _payload[pageNoKey] : _payload.pageNo;
              const hasMore = Math.ceil(data.total / _payload.pageSize) > currentPageNo;
              update({
                [pagingKey]: { pageSize: _payload.pageSize, total: data.total, hasMore, pageNo: currentPageNo },
              });
            }
          } else {
            getConfig('onAPIFail')?.('error', err.msg || errorMsg);
          }
          return fullResult ? result : data === undefined ? {} : data;
        } else {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('[shell] None standard response body', fn.name);
          }
          if (successMsg) {
            getConfig('onAPISuccess')?.(successMsg);
          }
        }
        return result;
      },
      getParams() {
        if (storeMap.routeInfo) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return storeMap.routeInfo.getState((s: any) => s.params);
        }
      },
      getQuery() {
        if (storeMap.routeInfo) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return storeMap.routeInfo.getState((s: any) => s.query);
        }
      },
    };
  },
});

export { createStore, createFlatStore, use, storeMap };
