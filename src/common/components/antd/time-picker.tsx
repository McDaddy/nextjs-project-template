import { Dayjs } from 'dayjs';
import * as React from 'react';
import DatePicker from './data-picker';
import { PickerTimeProps } from 'antd/lib/date-picker/generatePicker';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
