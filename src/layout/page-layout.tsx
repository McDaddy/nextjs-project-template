/*
 * Copyright (c) 2021 Terminus, Inc.
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu; // https://github.com/ant-design/ant-design/issues/30396

interface IProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: IProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (bool: boolean) => {
    setCollapsed(bool);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="h-full">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="0">
            <Link href="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="/entity">实体管理</Link>
          </Menu.Item>
          <SubMenu key="sub1" title="标签管理">
            <Menu.Item key="3">
              <Link href="/label">标签管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>我是面包屑1</Breadcrumb.Item>
            <Breadcrumb.Item>我是面包屑2</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>我是Footer</Footer>
      </Layout>
    </Layout>
  );
};
