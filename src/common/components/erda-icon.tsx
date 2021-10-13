import React from 'react';
import { themeColor } from 'src/common';

interface IProps {
  type: string; // unique identification of icon
  style?: React.CSSProperties;
  width?: string; // with of svg, and it's more priority than size
  height?: string; // height of svg, and it's more priority than size
  spin?: boolean; // use infinite rotate animation like loading icon, the default value is false
  size?: string; // size of svg with default value of 1rem. Use width and height if width-to-height ratio is not 1
  fill?: string; // color of svg fill area, and it's more priority than color
  stroke?: string; // color of svg stroke, and it's more priority than color
  color?: string; // color of svg
  rtl?: boolean; // acoustic image, the default value is from left to right
  className?: string;
  onClick?: React.MouseEventHandler;
}

export const ErdaIcon = ({ type, fill, color, stroke, className, ...rest }: IProps) => {
  return (
    <iconpark-icon
      name={type}
      fill={themeColor[fill || '']}
      color={themeColor[color || '']}
      stroke={themeColor[stroke || '']}
      class={className}
      {...rest}
    />
  );
};
