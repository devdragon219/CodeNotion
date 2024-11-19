import { PriceListFieldValue } from '../../../interfaces/FieldValues/PriceList';

export interface PriceListArticlesTableProps {
  outstanding?: boolean;
  priceList?: PriceListFieldValue;
  readonly?: boolean;
}
