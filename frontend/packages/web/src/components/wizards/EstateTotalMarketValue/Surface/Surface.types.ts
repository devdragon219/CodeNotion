import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateSurfaceStepProps {
  estateTotalMarketValue: EstateTotalMarketValueFormInput;
  onChange: (estateTotalMarketValue: EstateTotalMarketValueFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
