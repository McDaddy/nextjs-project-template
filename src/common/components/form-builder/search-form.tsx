import React from 'react';
import { FormBuilder, IFormExtendType } from './form-builder';
import { Fields, IFieldType } from './fields';
import { map } from 'lodash';
import { Button } from 'antd';
import styles from './search-form.module.scss';

/* *
 * SearchForm is a form with search and reset buttons.
 * fields: fields in Fields
 * actions: buttons you wanna render, default: search button and reset button,
 * onSubmit and onReset: click action of search button and reset button
 * */
interface IProps {
  fields: IFieldType[];
  actions?: React.ReactElement[];
  onReset?: () => void;
  onSubmit?: (value: Obj) => void;
  className?: string;
}

const SearchForm = ({ fields, actions, onReset, onSubmit, className }: IProps) => {
  const searchFormRef = React.useRef<IFormExtendType>(null);

  const handleSubmit = () => {
    const formRef = searchFormRef.current;
    onSubmit?.(formRef?.getFieldsValue());
  };

  const handleReset = () => {
    const formRef = searchFormRef.current;
    onReset?.();

    setTimeout(() => {
      formRef?.resetFields();
    });
  };

  const actionFields = [
    {
      wrapperClassName: 'flex-1 max-w-full flex justify-end items-end',
      required: false,
      isHoldLabel: false,
      readonly: {
        className: 'text-right pt-2 overflow-hidden',
        renderItem: (
          <>
            {actions ? (
              map(actions, (action, idx) => {
                return (
                  <span key={idx} className="ml-2 first:ml-0">
                    {action}
                  </span>
                );
              })
            ) : (
              <>
                <Button onClick={handleReset} type="ghost">
                  重置
                </Button>
                <Button className="ml-2" onClick={handleSubmit} type="primary" ghost>
                  查询
                </Button>
              </>
            )}
          </>
        ),
      },
    },
  ];

  const realFields = React.useMemo(() => {
    return map(fields, (field) => {
      return {
        required: false,
        ...field,
      };
    });
  }, [fields]);

  return (
    <FormBuilder
      isMultiColumn
      ref={searchFormRef}
      size="small"
      className={`${className} ${styles['erda-search-form']}`}
    >
      <Fields fields={realFields.concat(actionFields)} />
    </FormBuilder>
  );
};

export default SearchForm;
