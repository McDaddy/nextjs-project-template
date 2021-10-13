import { forEach } from 'lodash';

export const routeMap: {
  [k: string]: { breadcrumbName: string; hasFooter?: boolean };
} = {
  '/tag': {
    breadcrumbName: '标签首页',
    hasFooter: true,
  },
  '/tag/detail/:id': {
    breadcrumbName: '标签详情',
  },
  '/tag/add': {
    breadcrumbName: '创建标签',
    hasFooter: true,
  },
  '/tag/edit/:id': {
    breadcrumbName: '编辑标签',
    hasFooter: true,
  },
  '/group': {
    breadcrumbName: '人群首页',
    hasFooter: true,
  },
  '/group/add': {
    breadcrumbName: '创建人群',
    hasFooter: true,
  },
  '/group/detail/:id': {
    breadcrumbName: '人群详情',
  },
  '/group/edit/:id': {
    breadcrumbName: '编辑人群',
    hasFooter: true,
  },
};

export const formatPath = (pathName: string) => {
  const regex = /\[(.+?)\]/g; // match /group/edit/[id] => id
  let match = regex.exec(pathName);
  const holdList: string[] = [];
  while (match) {
    holdList.push(match[1]);
    match = regex.exec(pathName);
  }
  let formattedPath = pathName;
  forEach(holdList, (holder) => {
    formattedPath = formattedPath.replace(`[${holder}]`, `:${holder}`);
  });
  return formattedPath;
};
