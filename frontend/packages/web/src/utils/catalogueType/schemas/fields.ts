import { getFormBuilderSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getCatalogueTypeFieldsSchema = (t: TFunction) =>
  object().shape({
    fields: getFormBuilderSchema(t),
  });
