import React from 'react';
import { NextPage } from 'next';
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useUpdate } from 'src/common/utils';
import { useMount } from 'react-use';
import { Table } from 'src/common';
import { getEntityList } from 'src/services/demo';
import styles from './index.module.scss';

const Demo: NextPage = () => {
  const [state, setState] = React.useState('');
  const [{ count }, updater] = useUpdate({
    count: 1,
  });

  const [data, loading] = getEntityList.useState();

  useMount(() => {
    getEntityList.fetch({ pageNo: 1, pageSize: 10 });
  });

  return (
    <div className={`${styles.demo} h-full p-10`}>
      <h1>This is demo page</h1>
      <div className="mb-4">
        <div>Input Demo</div>
        <Input className="!w-60" value={state} onChange={(e) => setState(e.target.value)} />
      </div>
      <div className="mb-4">
        <div className="mb-2">Current count: {count}</div>
        <Button onClick={() => updater.count(count + 1)}>Click me to add count</Button>
      </div>
      <div className="mb-4">
        <div>Image Demo</div>
        <Image src="/code.jpg" alt="alt" width="240px" height="90px" />
      </div>
      <div>API Demo</div>
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
            title: '关联标签数量',
            dataIndex: 'tagNumber',
          },
        ]}
        // @ts-ignore type
        dataSource={data?.data || []}
        pagination={data?.paging}
      />
    </div>
  );
};

export default Demo;
