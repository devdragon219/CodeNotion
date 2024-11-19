import { ServiceCategoryFormInput } from '../../../interfaces/FormInputs/ServiceCategory';

export interface ServiceCategoryDialogProps {
  onClose: () => void;
  onSave: (serviceCategory: ServiceCategoryFormInput) => void;
}
