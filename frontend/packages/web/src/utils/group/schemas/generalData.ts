import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getGroupGeneralDataSchema = (t: TFunction) =>
  object().shape({
    name: string().required(getRequiredTranslation('group.field.name', t)),
    description: string().required(getRequiredTranslation('group.field.description', t)),
  });
