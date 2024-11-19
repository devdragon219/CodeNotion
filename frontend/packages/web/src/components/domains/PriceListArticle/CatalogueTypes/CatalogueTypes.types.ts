import { Control, FieldErrors } from 'react-hook-form';

import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';

export interface PriceListArticleCatalogueTypesProps {
  control: Control<PriceListArticleFormInput>;
  errors: FieldErrors<PriceListArticleFormInput>;
  readonly?: boolean;
}
