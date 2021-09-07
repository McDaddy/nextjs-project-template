/*
 * Copyright (c) 2021 Terminus, Inc.
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { isFunction } from 'lodash';
import { useSetState, useUnmount } from 'react-use';

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
