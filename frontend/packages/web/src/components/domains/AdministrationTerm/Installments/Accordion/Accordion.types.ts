import { FieldErrors } from 'react-hook-form';

import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';

export interface AdministrationTermInstallmentFieldAccordionProps {
  installments: AdministrationTermInstallmentFormInput[];
  index: number;
  errors?: FieldErrors<AdministrationTermInstallmentFormInput>;
  value: AdministrationTermInstallmentFormInput;
  onChange: (value: AdministrationTermInstallmentFormInput) => void;
}
