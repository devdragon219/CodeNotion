import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigGeneralDataStepProps {
  canCreateTaxConfigTableValue: boolean;
  config: TaxConfigFormInput;
  onChange: (config: TaxConfigFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
