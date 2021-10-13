import React from 'react';
import { Layout } from 'antd';
import SiderMenu from './sider-menu';
import Header from './header';
import { formatPath, routeMap } from 'src/config/route-config';
import { useRouter } from 'next/router';

interface IProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: IProps) => {
  const { pathname } = useRouter();
  const currentRoute = React.useMemo(() => {
    return routeMap[formatPath(pathname)];
  }, [pathname]);
  const hasFooter = React.useMemo(() => {
    if (currentRoute) {
      return !!currentRoute.hasFooter;
    }
    return false;
  }, [currentRoute]);

  return (
    <Layout className="h-screen flex flex-row overflow-hidden">
      <SiderMenu />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="px-6 py-5 border-bottom">
          <Header />
        </div>
        <div className={`flex-1 overflow-hidden ${hasFooter ? 'pb-20' : 'pb-6'}`}>
          <div className="h-full overflow-auto box-border px-6">{children}</div>
        </div>
      </div>
    </Layout>
  );
};
