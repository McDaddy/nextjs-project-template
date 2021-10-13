import config from '../../tailwind.config';

export { ErdaIcon } from './components/erda-icon';
export { EmptyHolder } from './components/empty-holder';
export { default as FormBuilder } from './components/form-builder';
export type { IFieldType, IFormExtendType } from './components/form-builder';
export { default as DatePicker } from './components/antd/data-picker';
export { default as TimePicker } from './components/antd/time-picker';
export { default as Calendar } from './components/antd/calendar';
export { default as Pagination } from './components/antd/pagination';
export { default as Table } from './components/antd/table';

export const themeColor: Obj<string> = {};
const { colors } = config.theme.extend;
Object.keys(colors).forEach((topColor) => {
  if (typeof colors[topColor] === 'string') {
    themeColor[topColor] = colors[topColor];
  } else {
    Object.keys(colors[topColor]).forEach((subColor) => {
      themeColor[subColor === 'DEFAULT' ? topColor : `${topColor}-${subColor}`] = colors[topColor][subColor];
    });
  }
});

export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];
