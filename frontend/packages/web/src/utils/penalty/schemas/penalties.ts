import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

import { getConditionsBuilderSchema } from '../../components/conditionsBuilder/schemas/conditionsBuilder';

export const getPenaltiesSchema = (canUseInternalCodes: Record<string, boolean>, t: TFunction) =>
  object().shape({
    penalties: array().of(
      object().shape({
        internalCode: string()
          .required(getRequiredTranslation('penalty.field.internal_code', t))
          .test('validInternalCode', function () {
            const { createError, path } = this;
            const { guid } = this.parent as { guid: string };
            const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
            return canUseInternalCode || createError({ path, message: t('penalty.error.internal_code') });
          }),
        description: string().required(getRequiredTranslation('penalty.field.description', t)),
        conditions: getConditionsBuilderSchema(t),
      }),
    ),
  });
