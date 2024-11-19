import {
  CatalogueTypeActivityFormInput,
  CatalogueTypeFormInput,
} from '../../../../../interfaces/FormInputs/CatalogueType';

export interface ActivitiesDialogProps {
  activities: CatalogueTypeActivityFormInput[];
  catalogueType: CatalogueTypeFormInput | null;
  onClose: () => void;
  onSave: (value: CatalogueTypeActivityFormInput[]) => void;
}
