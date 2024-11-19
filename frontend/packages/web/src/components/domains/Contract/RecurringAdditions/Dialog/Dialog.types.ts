import { ContractRecurringAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface RecurringAdditionDialogInput {
  recurringAddition: ContractRecurringAdditionFormInput;
  index: number;
}

export interface RecurringAdditionDialogProps {
  input?: RecurringAdditionDialogInput;
  onClose: () => void;
  onSave: (value: ContractRecurringAdditionFormInput | RecurringAdditionDialogInput) => void;
}
