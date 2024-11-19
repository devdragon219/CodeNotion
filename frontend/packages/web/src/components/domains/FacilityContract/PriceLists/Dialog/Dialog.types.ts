import { PriceListFieldValue } from '../../../../../interfaces/FieldValues/PriceList';

export interface PriceListsDialogProps {
  priceLists: PriceListFieldValue[];
  onClose: () => void;
  onSave: (priceLists: PriceListFieldValue[]) => void;
}
