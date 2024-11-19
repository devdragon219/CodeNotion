import {
  CatalogueTypeCatalogueCategoryFormInput,
  CatalogueTypeFormInput,
} from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeGeneralDataStepProps {
  canUseInternalCode: boolean;
  catalogueType: CatalogueTypeFormInput;
  onAddCatalogueCategory: (onComplete: () => void) => void;
  onAddCatalogueSubCategory: (input: CatalogueTypeCatalogueCategoryFormInput) => void;
  onChange: (catalogueType: CatalogueTypeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
