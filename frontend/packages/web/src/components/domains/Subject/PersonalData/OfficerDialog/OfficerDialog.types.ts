import { EntryStatus } from '@realgimm5/frontend-common/gql/types';

import { SubjectOfficerFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface OfficerDialogInput {
  officer: SubjectOfficerFormInput;
  index: number;
}

export interface OfficerDialogProps {
  entryStatus: EntryStatus;
  input?: OfficerDialogInput;
  required?: boolean;
  selectedOfficers: SubjectOfficerFormInput[];
  useOfficerType?: boolean;
  onClose: () => void;
  onSave: (value: SubjectOfficerFormInput[] | OfficerDialogInput) => void;
}
