import { SubjectHeirFormInput } from '../../../interfaces/FormInputs/Subject';

export interface HeirDialogInput {
  heir: SubjectHeirFormInput;
  index: number;
}

export interface HeirDialogProps {
  input?: HeirDialogInput;
  owningManagementSubjectIds: number[];
  selectedHeirs: SubjectHeirFormInput[];
  subjectId?: number | null;
  onClose: () => void;
  onSave: (value: SubjectHeirFormInput[] | HeirDialogInput) => void;
}
