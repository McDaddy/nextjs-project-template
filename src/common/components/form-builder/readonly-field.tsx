import React from 'react';
import { isPlainObject, isFunction } from 'lodash';

interface IProps {
  renderData?: React.ReactNode;
  style?: React.CSSProperties;
  value?: Obj | string | number;
  className?: string;
}

const ReadonlyField = ({ renderData, style, className, value }: IProps) => {
  const realData = React.useMemo(() => {
    return renderData
      ? isFunction(renderData)
        ? renderData(value)
        : renderData
      : isPlainObject(value)
      ? JSON.stringify(value)
      : value
      ? value.toString()
      : '-';
  }, [renderData, value]);

  return (
    <div style={style} className={`overflow-auto ${className}`}>
      {realData}
    </div>
  );
};

export default ReadonlyField;
