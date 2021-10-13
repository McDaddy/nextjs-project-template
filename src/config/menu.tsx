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
    key: 'demo',
    label: 'DEMO市场',
    icon: <ErdaIcon type="flag" {...iconProps} />,
    subMenus: [
      {
        label: 'DEMO首页',
        href: '/demo',
      },
    ],
  },
];
