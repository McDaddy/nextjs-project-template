import { ErdaIcon } from 'src/common';

const iconProps = {
  className: 'cursor-pointer',
};

interface MenuItem {
  key?: string;
  label: string;
  icon: JSX.Element;
  href?: string;
  subMenus?: Array<{
    label: string;
    href: string;
  }>;
}

export const menuConfig: MenuItem[] = [
  {
    key: 'tag',
    label: '标签市场',
    icon: <ErdaIcon type="flag" {...iconProps} />,
    subMenus: [
      {
        label: '标签首页',
        href: '/tag',
      },
    ],
  },
  {
    key: 'group',
    label: '人群管理',
    icon: <ErdaIcon type="people" {...iconProps} />,
    subMenus: [
      {
        label: '人群首页',
        href: '/group',
      },
    ],
  },
];
