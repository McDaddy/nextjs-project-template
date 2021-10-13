/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface IntrinsicElements {
    'iconpark-icon': any;
  }
}

declare module '*.scss';

interface Obj<T = any> {
  [k: string]: T;
}

type NullableValue<T> = {
  [K in keyof Required<T>]: T[K] extends null
    ? null | Obj // 初始状态里对象值可能是null
    : T[K] extends never[]
    ? any[] // 初始值是空数组，则认为可放任意结构数组
    : T[K] extends { [p: string]: never }
    ? Obj // 初始值是空对象，不限制内部结构，是object类型即可
    : T[K];
};

interface IUserInfo {
  avatar: string;
  email: string;
  id: string;
  lastLoginAt: string;
  name: string;
  nick: string;
  phone: string;
  pwdExpireAt: string;
  source: string;
  token: string;
}

interface IPaging {
  [prop: string]: any;
  total: number;
  pageNo: number;
  pageSize: number;
  hasMore?: boolean;
}

interface IPagingRequest {
  pageNo: number;
  pageSize?: number;
}

interface IPagingData<T> {
  list: T[];
  paging: IPaging;
}

interface RAW_RESPONSE<T = any> {
  data: T;
  err: {
    code: string;
    msg: string;
  } | null;
  success: boolean;
  userInfo?: Array<{
    id: string;
    name: string;
    nickname: string;
  }>;
  userIDs?: string[];
}

type Nullable<T> = T | null;

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
