import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeActivitiesStepProps {
  catalogueType: CatalogueTypeFormInput;
  onBack: () => void;
  onChange: (catalogueType: CatalogueTypeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
