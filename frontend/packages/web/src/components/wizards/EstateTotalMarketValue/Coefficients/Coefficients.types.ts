import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateCoefficientsStepProps {
  estateTotalMarketValue: EstateTotalMarketValueFormInput;
  onBack: () => void;
  onChange: (estateTotalMarketValue: EstateTotalMarketValueFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
