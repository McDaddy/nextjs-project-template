import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

// eslint-disable-next-line no-console
console.log('OPENAPI_ADDR', process.env.OPENAPI_ADDR);

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: process.env.OPENAPI_ADDR?.startsWith('http://')
      ? process.env.OPENAPI_ADDR
      : `http://${process.env.OPENAPI_ADDR}`,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
  });

// https://github.com/stegano/next-http-proxy-middleware/issues/33
export const config = {
  api: {
    bodyParser: false,
  },
};
