import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

import { getConditionsBuilderSchema } from '../../components/conditionsBuilder/schemas/conditionsBuilder';

export const getSlasSchema = (canUseInternalCodes: Record<string, boolean>, t: TFunction) =>
  object().shape({
    slas: array().of(
      object().shape({
        internalCode: string()
          .required(getRequiredTranslation('sla.field.internal_code', t))
          .test('validInternalCode', function () {
            const { createError, path } = this;
            const { guid } = this.parent as { guid: string };
            const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
            return canUseInternalCode || createError({ path, message: t('sla.error.internal_code') });
          }),
        description: string().required(getRequiredTranslation('sla.field.description', t)),
        conditions: getConditionsBuilderSchema(t),
      }),
    ),
  });
