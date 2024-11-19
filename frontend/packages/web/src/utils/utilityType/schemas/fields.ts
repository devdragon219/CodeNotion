import { getFormBuilderSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getUtilityTypeFieldsSchema = (t: TFunction) =>
  object().shape({
    fields: getFormBuilderSchema(t),
  });
