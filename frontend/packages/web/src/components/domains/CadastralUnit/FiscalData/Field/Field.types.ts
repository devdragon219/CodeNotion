import { Control, FieldErrors } from 'react-hook-form';

import {
  CadastralUnitFormInput,
  CadastralUnitTaxCalculatorFormInput,
} from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitTaxCalculatorFieldProps {
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  index: number;
  readonly?: boolean;
  taxCalculator: CadastralUnitTaxCalculatorFormInput;
}
