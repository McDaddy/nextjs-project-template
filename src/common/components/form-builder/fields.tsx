import React from 'react';
import { Form, Row, Col } from 'antd';
import { map, some, isBoolean, has } from 'lodash';
import { FormItemProps, Rule } from 'antd/lib/form';
import { FormContext } from './form-builder';
import type { IContextType } from './form-builder';
import ReadonlyField from './readonly-field';

const { Item } = Form;

/**
 * Fields is a Form.Item list, so it must be wrapped in FormBuilder which is a Form container.
 *
 * fields: {
 *  type: your component, like Input, Select etc.
 *  customProps: props of your component.
 *  wrapperClassName: the style class name of Item's wrapper.
 *  isHoldLabel: whether to occupy a position when label is empty, default true.
 *  readonly: whether to use readonly Item, it can bool or object,
 *            when object , you can set renderItem to render a
 *            customized component you want.
 *            weight: fields' item's > Fields' > FormBuilder's
 * },
 * fid: Fields id, must be unique.
 * isMultiColumn: whether use multiple column or not.
 * columnNum: amount of column, only become effective when isMultiColumn is true. default Adaptive.
 * readonly: whether all Form.Items in Fields is readonly, default false.
 *
 * else : The same as antd Form.Item.
 *
 *
 * example:
 *
 *  <FormBuilder>
 *    <Fields
 *      fields={[{ type: Input, customProps: { maxLength: 10 } }]}
 *      fid="basic-fields"
 *    />
 *  </FormBuilder>
 * */
export interface IFieldType extends FormItemProps {
  type?: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customProps?: React.ComponentProps<any>;
  wrapperClassName?: string;
  colSpan?: number;
  isHoldLabel?: boolean;
  rowFields?: IFieldType[];
  readonly?:
    | boolean
    | {
        renderItem: React.ReactNode;
        style?: React.CSSProperties;
        className?: string;
      };
}

interface IProps {
  fields: IFieldType[];
  fid?: string;
  isMultiColumn?: boolean;
  columnNum?: number;
  readonly?: boolean;
}

const getRules = (required: boolean, label: React.ReactNode, rules: Rule[]) => {
  const afterAddRequiredRules =
    required && !some(rules, (rule) => has(rule, 'required'))
      ? [{ required: true, message: `${label}不能为空` }, ...rules]
      : rules;
  return afterAddRequiredRules;
};

export const Fields: React.MemoExoticComponent<
  ({ fields, isMultiColumn, columnNum, readonly, fid }: IProps) => JSX.Element
> = React.memo(({ fields = [], isMultiColumn, columnNum, readonly, fid }: IProps) => {
  const getColumn = (contextProps: IContextType) => {
    if (isMultiColumn || (isMultiColumn === undefined && contextProps.parIsMultiColumn)) {
      if (columnNum) return columnNum;
      if (contextProps.parColumnNum) return contextProps.parColumnNum;
      return contextProps.realColumnNum;
    }
    return 1;
  };

  return (
    <FormContext.Consumer>
      {(contextProps) => {
        if (!contextProps) return null;
        fid && contextProps.setFieldsInfo(fid, fields);
        const fieldRealColumnNum = getColumn(contextProps);
        if (!fieldRealColumnNum) return null;
        if (!isMultiColumn) {
          return (
            <>
              {map(fields, (item, idx) => {
                const {
                  type: Comp,
                  customProps = {},
                  required = true,
                  rules = [],
                  readonly: itemReadonly,
                  className,
                  wrapperClassName,
                  label,
                  isHoldLabel = true,
                  colSpan,
                  rowFields,
                  ...rest
                } = item;
                const afterAddRequiredRules = getRules(required, label, rules);
                const isRealReadOnly =
                  (itemReadonly !== undefined
                    ? itemReadonly
                    : readonly !== undefined
                    ? readonly
                    : contextProps?.parReadonly) || false;
                const realReadData = isBoolean(isRealReadOnly) ? null : isRealReadOnly;
                return (
                  <Row gutter={[20, 0]} key={idx}>
                    {rowFields ? (
                      map(rowFields, (i) => {
                        const {
                          colSpan: childColSpan,
                          wrapperClassName: ChildWrapperClassName,
                          isHoldLabel: childIsHoldLabel,
                          label: childLabel,
                          customProps: childCustomProps,
                          type: ChildType,
                          required: childRequired = true,
                          rules: childRules = [],
                          ...childRest
                        } = i;
                        const childrenRules = getRules(childRequired, childLabel, childRules);
                        return (
                          <Col
                            key={childLabel as React.Key}
                            span={childColSpan || 24 / rowFields.length}
                            className={ChildWrapperClassName}
                          >
                            <Item
                              {...childRest}
                              label={childLabel || (childIsHoldLabel ? <div /> : undefined)}
                              required={childRequired}
                              rules={childrenRules}
                              className={i.className}
                            >
                              {ChildType && <ChildType {...childCustomProps} />}
                            </Item>
                          </Col>
                        );
                      })
                    ) : (
                      <Col span={colSpan || 24 / fieldRealColumnNum} className={wrapperClassName}>
                        <Item
                          label={label || (isHoldLabel ? <div /> : undefined)}
                          required={required}
                          rules={afterAddRequiredRules}
                          className={className}
                          {...rest}
                        >
                          {isRealReadOnly ? (
                            <ReadonlyField
                              {...customProps}
                              {...realReadData}
                              renderData={realReadData && realReadData.renderItem}
                            />
                          ) : (
                            Comp && <Comp {...customProps} />
                          )}
                        </Item>
                      </Col>
                    )}
                  </Row>
                );
              })}
            </>
          );
        }
        return (
          <Row gutter={[20, 0]}>
            {map(fields, (item, idx) => {
              const {
                type: Comp,
                customProps = {},
                required = true,
                rules = [],
                readonly: itemReadonly,
                className,
                wrapperClassName,
                label,
                isHoldLabel = true,
                colSpan,
                ...rest
              } = item;
              const afterAddRequiredRules =
                required && !some(rules, (rule) => has(rule, 'required'))
                  ? [{ required: true, message: `${label}不能为空` }, ...rules]
                  : rules;
              const isRealReadOnly =
                (itemReadonly !== undefined
                  ? itemReadonly
                  : readonly !== undefined
                  ? readonly
                  : contextProps?.parReadonly) || false;
              const realReadData = isBoolean(isRealReadOnly) ? null : isRealReadOnly;
              return (
                <Col span={colSpan || 24 / fieldRealColumnNum} key={idx} className={wrapperClassName}>
                  <Item
                    label={label || (isHoldLabel ? <div /> : undefined)}
                    required={required}
                    rules={afterAddRequiredRules}
                    className={className}
                    {...rest}
                  >
                    {isRealReadOnly ? (
                      <ReadonlyField
                        {...customProps}
                        {...realReadData}
                        renderData={realReadData && realReadData.renderItem}
                      />
                    ) : (
                      Comp && <Comp {...customProps} />
                    )}
                  </Item>
                </Col>
              );
            })}
          </Row>
        );
      }}
    </FormContext.Consumer>
  );
});
