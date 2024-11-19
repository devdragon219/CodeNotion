import { FormMode } from '@realgimm5/frontend-common/enums';
import { CatalogueTypeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { PriceListArticleFormInput } from '../../../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleCatalogueTypesTransferListProps {
  control: Control<PriceListArticleFormInput>;
  errors: FieldErrors<PriceListArticleFormInput>;
  mode: FormMode;
  where?: CatalogueTypeFilterInput;
}
