import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateMarketValuesStepProps {
  estateTotalMarketValue: EstateTotalMarketValueFormInput;
  onBack: () => void;
  onChange: (estateTotalMarketValue: EstateTotalMarketValueFormInput) => void;
  onError: () => void;
  onSave: (estateTotalMarketValue: EstateTotalMarketValueFormInput) => void;
}
