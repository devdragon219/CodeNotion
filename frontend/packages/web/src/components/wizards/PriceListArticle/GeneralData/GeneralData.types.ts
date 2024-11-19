import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleGeneralDataStepProps {
  canUseInternalCode: boolean;
  priceListArticle: PriceListArticleFormInput;
  usePriceList: boolean;
  onChange: (priceListArticle: PriceListArticleFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
