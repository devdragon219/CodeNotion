import { TaxConfigValueFormInput } from '../../../../../interfaces/FormInputs/TaxConfig';
import { TaxConfigValueFieldProps } from '../../../../core/Fields/TaxConfigValue/TaxConfigValue.types';

export interface TaxConfigValueFieldAccordionProps extends TaxConfigValueFieldProps {
  fields: TaxConfigValueFormInput[];
  index: number;
}
