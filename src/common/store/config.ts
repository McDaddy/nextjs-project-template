/* eslint-disable @typescript-eslint/no-explicit-any */

type ConfigType = 'onAPISuccess' | 'onAPIFail' | 'history';

const config: { [k in ConfigType]?: any } = {};

export const getConfig = (key: ConfigType) => config[key];
export const setConfig = (key: ConfigType, value: any) => {
  config[key] = value;
};
