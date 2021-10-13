/* eslint-disable react/no-danger */
import { PageLayout } from '../layout/page-layout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { initAxios } from 'src/common/utils/axios-config';
import ErrorBoundary from 'src/common/components/error-boundary';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react';
import { ConfigProvider, message } from 'antd';
import '../styles/antd-extension.scss';
import 'tailwindcss/tailwind.css';
import zhCN from 'antd/lib/locale/zh_CN';
import { setConfig } from 'src/common/store/config';

initAxios();

setConfig('onAPISuccess', message.success);
setConfig('onAPIFail', message.error);

const iconConfig = {
  ...DEFAULT_ICON_CONFIGS,
  prefix: 'cdp', // app name
};

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Custom Erda App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.png" />
        {/* insert icon-park link here */}
        <script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_3408_42.5d117228040ba154d50f30a51d63891a.es5.js" />
        {process.env.NODE_ENV !== 'production' && process.env.DISABLE_ERROR_OVERLAY === 'true' && (
          <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
        )}
      </Head>
      <IconProvider value={iconConfig}>
        <ConfigProvider
          locale={zhCN}
          getPopupContainer={(trigger: HTMLElement) => trigger?.parentElement || document.body}
        >
          <PageLayout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </PageLayout>
        </ConfigProvider>
      </IconProvider>
    </>
  );
};

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;

export default CustomApp;
