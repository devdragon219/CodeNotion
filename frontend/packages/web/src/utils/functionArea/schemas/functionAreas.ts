import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getFunctionAreasSchema = (canUseInternalCodes: Record<string, boolean>, t: TFunction) =>
  object().shape({
    functionAreas: array().of(
      object().shape({
        internalCode: string()
          .required(getRequiredTranslation('function_area.field.function_area_code', t))
          .test('validInternalCode', function () {
            const { createError, path } = this;
            const { guid } = this.parent as { guid: string };
            const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
            return canUseInternalCode || createError({ path, message: t('function_area.error.internal_code') });
          }),
        name: string().required(getRequiredTranslation('function_area.field.function_area_name', t)),
        surfaceType: string().required(getRequiredTranslation('function_area.field.function_area_type', t)),
      }),
    ),
  });
