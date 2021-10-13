import React from 'react';
import { ErdaIcon } from 'src/common';
import { useResizeDetector } from 'react-resize-detector';

export const EmptyHolder = () => {
  const targetRef = React.useRef(null);
  const { width, height } = useResizeDetector({ targetRef });

  const size = React.useMemo(() => {
    if (width && height) {
      const _size = Math.min(width, height) * 0.15;
      return `${Math.max(_size, 88)}`;
    } else {
      return '88';
    }
  }, [height, width]);

  return (
    <div className="h-full w-full flex justify-center align-center" ref={targetRef}>
      <ErdaIcon type="empty-holder" size={size} />
    </div>
  );
};
