import { FormBuilder, PureFormBuilder, IFormExtendType } from './form-builder';
import { Fields, IFieldType } from './fields';
import SearchForm from './search-form';

type IFormBuilder = typeof FormBuilder;

interface IErdaFormInterface extends IFormBuilder {
  Fields: typeof Fields;
  PureFormBuilder: typeof PureFormBuilder;
  SearchForm: typeof SearchForm;
}

const RealFormBuilder = FormBuilder as IErdaFormInterface;

RealFormBuilder.PureFormBuilder = PureFormBuilder;
RealFormBuilder.Fields = Fields;
RealFormBuilder.SearchForm = SearchForm;

export default RealFormBuilder;

export type { IFormExtendType, IFieldType };
