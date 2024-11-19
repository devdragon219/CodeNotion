import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleGeneralDataProps {
  control: Control<PriceListArticleFormInput>;
  errors: FieldErrors<PriceListArticleFormInput>;
  mode: FormMode;
  readonly?: boolean;
  usePriceList: boolean;
}
