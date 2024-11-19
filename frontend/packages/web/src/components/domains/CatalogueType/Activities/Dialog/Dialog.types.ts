import { CatalogueTypeActivityFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';

export interface ActivityDialogInput {
  activity: CatalogueTypeActivityFormInput;
  index: number;
}

export interface ActivityDialogProps {
  input?: ActivityDialogInput;
  onClose: () => void;
  onSave: (value: CatalogueTypeActivityFormInput[] | ActivityDialogInput) => void;
}
