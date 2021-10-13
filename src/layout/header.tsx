import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import { match } from 'path-to-regexp';
import { routeMap } from 'src/config/route-config';

interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}

function Header() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Route[]>([]);

  React.useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      let fullPath = '';
      const pathArray = linkPath
        .map((path, i) => {
          fullPath = `${fullPath}/${path}`;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let label: ((params?: any) => string) | null = null;
          Object.keys(routeMap).some((p) => {
            const _match = match(p, { decode: decodeURIComponent });
            const pathWithOutQuery = fullPath.slice(0, fullPath.indexOf('?') + 1 || fullPath.length);
            if (_match(pathWithOutQuery)) {
              const _breadcrumbName = routeMap[p]?.breadcrumbName;
              label = (_payload) => _breadcrumbName;
              return true;
            }
            return false;
          });
          if (label) {
            // @ts-ignore typo
            const breadcrumbName = label(router.query);
            return { breadcrumbName, path: `/${linkPath.slice(0, i + 1).join('/')}` };
          }
          return null;
        })
        .filter((item): item is Route => !!item);

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  const itemRender = (route: Route) => {
    const isSelf = route.path === router.asPath;
    const label = route.breadcrumbName;
    return (
      <span className={`${isSelf ? '' : 'cursor-pointer'} text-xs`} onClick={() => router.push(route.path)}>
        {label}
      </span>
    );
  };

  return <Breadcrumb routes={breadcrumbs} itemRender={itemRender} />;
}

export default Header;
