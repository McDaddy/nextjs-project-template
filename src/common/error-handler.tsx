import React from 'react';
import { notification } from 'antd';

const showError = ({
  title,
  simpleMsg,
  errLevel,
}: {
  title: string;
  simpleMsg: string;
  errLevel: 'warning' | 'error';
}) => {
  notification[errLevel]({
    message: title,
    description: <pre className="notify-error-detail">{simpleMsg}</pre>,
    style: {
      width: 440,
      marginLeft: 385 - 440,
    },
  });
};

const getErrLevelAndMsg = (statusCode: number) => {
  const statusErrorMap = {
    400: { level: 'warning', msg: '您当前请求可能存在问题，请检查后再试' },
    401: { level: 'warning', msg: '您当前未登录' },
    403: { level: 'warning', msg: '很抱歉，您暂无权限进行此操作' },
    500: { level: 'error', msg: '很抱歉，服务器遇到问题，我们将尽快修复' },
    503: { level: 'error', msg: '很抱歉，服务暂时不可用，请稍后再试' },
    504: { level: 'error', msg: '很抱歉，服务器暂时繁忙，请稍后再试' },
    default: { level: 'error', msg: '很抱歉，当前请求遇到问题，我们将尽快修复' },
  };

  return statusErrorMap[statusCode] || statusErrorMap.default;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (err: any) => {
  let errLevel: 'warning' | 'error' = 'warning';
  let title = '出错了';
  let simpleMsg = err.message;

  let { body, statusCode } = err;
  if (err.response) {
    body = err.response.body;
    statusCode = err.response.statusCode;
  }
  if (body) {
    // request error
    const { msg, level } = getErrLevelAndMsg(statusCode);
    title = '请求出错了';
    simpleMsg = msg;
    errLevel = level;

    if (body && body.err) {
      simpleMsg = body.err.msg || simpleMsg;
    }
  }

  showError({ title, simpleMsg, errLevel });
};

export default handler;
