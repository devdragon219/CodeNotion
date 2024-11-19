import { WorkerFormInput } from '../../../../interfaces/FormInputs/Worker';

export interface WorkerDialogInput {
  worker: WorkerFormInput;
  index: number;
}

export interface WorkerDialogProps {
  input?: WorkerDialogInput;
  onClose: () => void;
  onSave: (value: WorkerFormInput[] | WorkerDialogInput) => void;
}
