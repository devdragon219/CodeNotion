import { PriceListArticleFormInput } from '../../../../../interfaces/FormInputs/PriceListArticle';

export interface CatalogueTypesDialogProps {
  catalogueTypes: PriceListArticleFormInput['catalogueTypes'];
  onClose: () => void;
  onSave: (value: PriceListArticleFormInput['catalogueTypes']) => void;
}
