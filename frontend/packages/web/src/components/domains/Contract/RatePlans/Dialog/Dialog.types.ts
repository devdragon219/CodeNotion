import { ContractRatePlanFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface RatePlanDialogInput {
  ratePlan: ContractRatePlanFormInput;
  index: number;
}

export interface RatePlanDialogProps {
  input?: RatePlanDialogInput;
  onClose: () => void;
  onSave: (value: ContractRatePlanFormInput | RatePlanDialogInput) => void;
}
