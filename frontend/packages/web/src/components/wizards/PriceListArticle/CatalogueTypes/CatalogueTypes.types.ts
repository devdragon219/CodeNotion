import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleCatalogueTypesStepProps {
  priceListArticle: PriceListArticleFormInput;
  onBack: () => void;
  onChange: (priceListArticle: PriceListArticleFormInput) => void;
  onError: (message?: string) => void;
  onSave: (priceListArticle: PriceListArticleFormInput) => void;
}
