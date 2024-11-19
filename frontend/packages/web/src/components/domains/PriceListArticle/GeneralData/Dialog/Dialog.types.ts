import { PriceListArticlePricePeriodFormInput } from '../../../../../interfaces/FormInputs/PriceListArticle';

export interface PricePeriodDialogInput {
  index: number;
  pricePeriod: PriceListArticlePricePeriodFormInput;
}

export interface PricePeriodDialogProps {
  input?: PricePeriodDialogInput;
  pricePeriods: PriceListArticlePricePeriodFormInput[];
  onClose: () => void;
  onSave: (value: PriceListArticlePricePeriodFormInput | PricePeriodDialogInput) => void;
}
