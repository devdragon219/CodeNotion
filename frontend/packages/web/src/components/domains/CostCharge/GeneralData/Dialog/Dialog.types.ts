import { CostChargeFormInput } from '../../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeConsumptionDialogProps {
  input: CostChargeFormInput['consumptions'];
  measurementUnit: string;
  periodEnd: Date | null;
  periodStart: Date | null;
  timeOfUseRateCount: number;
  type: 'actual' | 'expected';
  onClose: () => void;
  onSave: (consumptions: CostChargeFormInput['consumptions']) => void;
}
