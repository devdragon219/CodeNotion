import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getConfigSchema = (t: TFunction) =>
  object().shape({
    value: string()
      .required(getRequiredTranslation('config.field.value', t))
      .max(1024, t('config.error.value_max_length')),
  });
