/*
 * Copyright (c) 2021 Terminus, Inc.
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later (
 * ), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { Table } from 'antd';
import { getEntityList } from 'src/services/entity';
import { useMount } from 'react-use';

const Entity = () => {
  const [data, loading] = getEntityList.useState();

  useMount(() => {
    getEntityList.fetch({ pageNo: 1, pageSize: 10 });
  });

  return (
    <Table
      className="mt-3"
      loading={loading}
      rowKey="id"
      columns={[
        {
          title: '实体名称',
          dataIndex: 'modelName',
        },
        {
          title: '实体Code',
          dataIndex: 'modelKey',
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
        },
        {
          title: '创建者',
          dataIndex: 'createdBy',
          // render: getUserName,
        },
        {
          title: '关联标签数量',
          dataIndex: 'tagNumber',
        },
      ]}
      // @ts-ignore sss
      dataSource={data?.data || []}
      pagination={data?.paging}
    />
  );
};

export default Entity;
