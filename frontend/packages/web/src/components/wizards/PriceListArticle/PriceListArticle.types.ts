import { PriceListFieldValue } from '../../../interfaces/FieldValues/PriceList';
import { PriceListArticleFormInput } from '../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleCreateDialogProps {
  priceList?: PriceListFieldValue;
  onClose: () => void;
  onSave: (priceListArticle: PriceListArticleFormInput) => void;
}
