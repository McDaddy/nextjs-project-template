import React from 'react';
import { Table, TableProps, Dropdown, Menu } from 'antd';
import { map } from 'lodash';
import produce from 'immer';
import { ErdaIcon, PAGE_SIZE_OPTIONS } from 'src/common';

interface IProps<RecordType> extends TableProps<RecordType> {
  rowAction?: {
    render: (record: RecordType, index: number) => React.ReactNode[];
    fixed?: boolean | 'right' | 'left';
    width?: number;
  };
}

const CustomTable = <RecordType extends Obj>(props: IProps<RecordType>) => {
  const { rowAction, columns = [], scroll = {}, onRow, rowClassName } = props;
  const ref = React.useRef(null);

  const finalColumns = React.useMemo(() => {
    return map(
      produce(columns, (draft) => {
        rowAction &&
          draft?.push({
            dataIndex: 'operations',
            title: <div className="text-right">操作</div>,
            key: 'operations',
            fixed: rowAction?.fixed || 'right',
            width: rowAction?.width,
            render: (_value, record: RecordType, index: number) => {
              let realActionList: React.ReactNode[] = [];
              const btnList = rowAction?.render(record, index);
              if (btnList && btnList.length > 3) {
                realActionList = btnList.slice(0, 3);
                const restBtnList = btnList.slice(3);
                const renderRestBtnList = (
                  <Dropdown
                    trigger={['click']}
                    overlay={
                      <Menu>
                        {map(restBtnList, (restBtn, idx) => {
                          return <Menu.Item key={idx}>{restBtn}</Menu.Item>;
                        })}
                      </Menu>
                    }
                    getPopupContainer={() => ref.current!}
                  >
                    <ErdaIcon type="more-col" className="cursor-pointer" fill="primary" />
                  </Dropdown>
                );
                realActionList.push(renderRestBtnList);
              } else {
                realActionList = btnList;
              }
              return (
                <div
                  className="flex justify-end divide-solid divide-y-0 divide-x divide-normal"
                  onClick={(e) => e.stopPropagation()}
                >
                  {map(realActionList, (btn, idx) => (
                    <span key={idx} className="px-2 cursor-pointer">
                      {btn}
                    </span>
                  ))}
                </div>
              );
            },
          });
      }),
      (item) => {
        return {
          ...item,
          ellipsis: true,
        };
      },
    );
  }, [columns, rowAction]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden">
      <Table
        {...props}
        rowClassName={`${onRow ? 'cursor-pointer' : ''} ${rowClassName}`}
        scroll={{ x: !props.dataSource?.length ? undefined : true, ...scroll }}
        columns={finalColumns}
        pagination={
          props.pagination !== false
            ? {
                defaultPageSize: 10,
                pageSizeOptions: PAGE_SIZE_OPTIONS,
                ...props.pagination,
              }
            : false
        }
      />
    </div>
  );
};

export default CustomTable;
