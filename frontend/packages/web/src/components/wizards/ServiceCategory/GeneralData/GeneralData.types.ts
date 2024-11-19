import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';

export interface ServiceCategoryGeneralDataStepProps {
  canUseInternalCode: boolean;
  serviceCategory: ServiceCategoryFormInput;
  onChange: (serviceCategory: ServiceCategoryFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
