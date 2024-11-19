import { EntryStatus } from '@realgimm5/frontend-common/gql/types';

import { SubjectBankAccountFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface BankAccountDialogInput {
  bankAccount: SubjectBankAccountFormInput;
  index: number;
}

export interface BankAccountDialogProps {
  entryStatus: EntryStatus;
  existingBankAccounts: SubjectBankAccountFormInput[];
  input?: BankAccountDialogInput;
  required?: boolean;
  onClose: () => void;
  onSave: (value: SubjectBankAccountFormInput[] | BankAccountDialogInput) => void;
}
