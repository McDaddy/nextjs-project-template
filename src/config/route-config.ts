import { forEach } from 'lodash';

export const routeMap: {
  [k: string]: { breadcrumbName: string; hasFooter?: boolean };
} = {
  '/demo': {
    breadcrumbName: 'DEMO首页',
    // hasFooter: true,
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
