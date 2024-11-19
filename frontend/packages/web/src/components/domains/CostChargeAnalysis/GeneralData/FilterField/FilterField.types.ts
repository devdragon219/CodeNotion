import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CostChargeAnalysisFormInput } from '../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisFilterFieldProps {
  control: Control<CostChargeAnalysisFormInput>;
  errors: FieldErrors<CostChargeAnalysisFormInput>;
  index: number;
  setValue: UseFormSetValue<CostChargeAnalysisFormInput>;
}
