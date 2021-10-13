import * as React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { PAGE_SIZE_OPTIONS } from 'src/common';

const Pagination = (props: PaginationProps) => {
  return <AntdPagination hideOnSinglePage pageSizeOptions={PAGE_SIZE_OPTIONS} {...props} />;
};

export default Pagination;
