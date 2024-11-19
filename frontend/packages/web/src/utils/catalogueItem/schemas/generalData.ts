import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getFormViewerSchema,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref, string } from 'yup';

export const getCatalogueItemGeneralDataSchema = (
  canUseInternalCodes: Record<string, boolean>,
  language: string,
  t: TFunction,
) =>
  object().shape(
    {
      internalCode: string()
        .required(getRequiredTranslation('catalogue_item.field.catalogue_item_code', t))
        .test('validInternalCode', function () {
          const { createError, path } = this;
          const { guid } = this.parent as { guid: string };
          const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
          return canUseInternalCode || createError({ path, message: t('catalogue_item.error.internal_code') });
        }),
      status: string().required(getRequiredTranslation('catalogue_item.field.catalogue_item_status', t)),
      activationDate: date()
        .required(getRequiredTranslation('catalogue_item.field.catalogue_item_activation_date', t))
        .min(MIN_DATE, getDateMinTranslation('catalogue_item.field.catalogue_item_activation_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('catalogue_item.field.catalogue_item_activation_date', language, t))
        .when('decommissioningDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('decommissioningDate'),
              getDateNotAfterTranslation(
                'catalogue_item.field.catalogue_item_activation_date',
                'catalogue_item.field.catalogue_item_decommissioning_date',
                t,
              ),
            ),
        }),
      decommissioningDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('catalogue_item.field.catalogue_item_decommissioning_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('catalogue_item.field.catalogue_item_decommissioning_date', language, t))
        .when(['activationDate', 'status'], ([activationDate, status], schema) => {
          if (status === EstateStatus.Decommissioned && !activationDate) {
            if (!activationDate) {
              return schema.required(
                getRequiredTranslation('catalogue_item.field.catalogue_item_decommissioning_date', t),
              );
            }
            return schema
              .required(getRequiredTranslation('catalogue_item.field.catalogue_item_decommissioning_date', t))
              .min(
                ref('activationDate'),
                getDateNotBeforeTranslation(
                  'catalogue_item.field.catalogue_item_decommissioning_date',
                  'catalogue_item.field.catalogue_item_activation_date',
                  t,
                ),
              );
          }
          return schema;
        }),
      lastMaintenanceDate: date()
        .required(getRequiredTranslation('catalogue_item.field.catalogue_item_last_maintenance_date', t))
        .min(MIN_DATE, getDateMinTranslation('catalogue_item.field.catalogue_item_last_maintenance_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('catalogue_item.field.catalogue_item_last_maintenance_date', language, t))
        .when('activationDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('activationDate'),
              getDateNotBeforeTranslation(
                'catalogue_item.field.catalogue_item_last_maintenance_date',
                'catalogue_item.field.catalogue_item_activation_date',
                t,
              ),
            ),
        }),
      fields: getFormViewerSchema(t),
    },
    [
      ['activationDate', 'decommissioningDate'],
      ['activationDate', 'lastMaintenanceDate'],
    ],
  );
