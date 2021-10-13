import React from 'react';
import { Menu, Popover } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ErdaIcon } from 'src/common';
import { menuConfig } from 'src/config/menu';

const { SubMenu } = Menu; // https://github.com/ant-design/ant-design/issues/30396

const toggleIcon = ({ isOpen }: { isOpen: boolean }) => {
  return !isOpen ? (
    <ErdaIcon className="opacity-20 mr-3" type="caret-down" size="8px" />
  ) : (
    <ErdaIcon className="opacity-20 mr-3" type="caret-up" size="8px" />
  );
};

const SiderMenu = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (bool: boolean) => {
    setCollapsed(bool);
  };

  const { pathname, push } = useRouter();

  const selectedKey = React.useMemo(() => {
    let key = '';
    menuConfig.some((item) => {
      if (item.subMenus) {
        return item.subMenus.some((sub) => {
          if (pathname.startsWith(`${sub.href}/`) || pathname === sub.href) {
            key = sub.href!;
            return true;
          }
          return false;
        });
      }
      return false;
    });
    return key;
  }, [pathname]);

  const defaultOpenKey = React.useMemo(() => {
    let key = '';
    menuConfig.some((item) => {
      if (item.subMenus) {
        return item.subMenus.some((sub) => {
          if (pathname.startsWith(`${sub.href}/`) || pathname === sub.href) {
            key = item.key!;
            return true;
          }
          return false;
        });
      }
      return false;
    });
    return key;
  }, [pathname]);

  const collapseIconProps = {
    size: '12',
    className: 'self-start ml-4 cursor-pointer',
    onClick: () => onCollapse(!collapsed),
  };

  return (
    <div
      className={`transition-width ${
        collapsed ? 'w-16' : 'w-52'
      } h-full flex flex-col bg-white py-4 z-20 flex-shrink-0`}
    >
      <div className="w-full overflow-hidden">
        <div className={`pl-5 flex items-center ${collapsed ? 'w-16' : 'w-52'}`}>
          <Image src="/images/logo.svg" alt="logo" width="24px" height="24px" />
          {collapsed ? null : <Image src="/images/logo-text.svg" alt="logo" width="140px" height="22.8px" />}
        </div>
      </div>
      <div className="flex-1 mt-5 flex flex-col justify-between overflow-auto">
        {collapsed ? (
          // collapsed mode
          <div className="flex flex-col mt-1 text-primary-900">
            {menuConfig.map((item) => {
              const content = (
                <div
                  key={item.key}
                  className={`${
                    defaultOpenKey === item.key || defaultOpenKey === item.href ? 'bg-light-primary rounded-r-lg' : ''
                  }  w-full h-12 flex justify-center items-center relative cursor-pointer`}
                  onClick={() => !item.subMenus && item.href && push(item.href)}
                >
                  {(defaultOpenKey === item.key || defaultOpenKey === item.href) && (
                    <div className="absolute w-1 h-full bg-primary left-0" />
                  )}
                  {item.icon}
                </div>
              );
              if (item.subMenus) {
                return (
                  <Popover
                    key={item.label}
                    placement="rightTop"
                    overlayClassName="sm-padding-popover"
                    content={() => {
                      return item?.subMenus?.map((sub) => {
                        return (
                          <div
                            className="cursor-pointer px-2 py-1 mb-1 last:mb-0 hover:bg-primary hover:bg-opacity-10"
                            key={sub.href}
                            onClick={() => push(sub.href)}
                          >
                            {sub.label}
                          </div>
                        );
                      });
                    }}
                    trigger="click"
                  >
                    {content}
                  </Popover>
                );
              } else {
                return content;
              }
            })}
          </div>
        ) : (
          // expended mode
          <Menu
            className="!pr-4"
            selectedKeys={[selectedKey]}
            mode="inline"
            expandIcon={toggleIcon}
            defaultOpenKeys={[defaultOpenKey]}
          >
            {menuConfig.map((item) => {
              const { label, subMenus, icon, href, key } = item;
              if (subMenus) {
                return (
                  <SubMenu key={key} title={<div className="text-primary-900 font-medium">{label}</div>} icon={icon}>
                    {subMenus.map((sub) => {
                      const { label: subLabel, href: subHref } = sub;
                      return (
                        <Menu.Item key={subHref}>
                          <Link href={subHref}>
                            <div className="text-primary-900">{subLabel}</div>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={href}>
                    <Link href={href!}>{label}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        )}
        {!collapsed ? (
          <ErdaIcon {...collapseIconProps} type="arrow-close" />
        ) : (
          <ErdaIcon {...collapseIconProps} type="arrow-open" />
        )}
      </div>
    </div>
  );
};

export default SiderMenu;
