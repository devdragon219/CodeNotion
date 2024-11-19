import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EstateUnitOwnershipType, EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getDateNotFutureTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, ref, string } from 'yup';

export const getEstateUnitGeneralDataSchema = (language: string, t: TFunction, minDate?: Date) =>
  object().shape(
    {
      internalCode: string().required(getRequiredTranslation('estate_unit.field.estate_unit_code', t)),
      address: object().required(getRequiredTranslation('estate_unit.field.address_toponymy', t)),
      floors: array().min(1, getRequiredTranslation('estate_unit.field.floors', t)),
      estateUnitType: string().required(getRequiredTranslation('estate_unit.field.estate_unit_type', t)),
      status: string().required(getRequiredTranslation('estate_unit.field.estate_unit_status', t)),
      disusedDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('estate_unit.field.disused_date', language, t))
        .max(Date(), getDateNotFutureTranslation('estate_unit.field.disused_date', t))
        .when('status', {
          is: (status: EstateUnitStatus | null) => status && status !== EstateUnitStatus.Existing,
          then: (schema) => schema.required(getRequiredTranslation('estate_unit.field.disused_date', t)),
        }),
      ownershipStartDate: date()
        .required(getRequiredTranslation('estate_unit.field.ownership_start_date', t))
        .min(
          minDate ?? MIN_DATE,
          getDateMinTranslation('estate_unit.field.ownership_start_date', language, t, minDate ?? MIN_DATE),
        )
        .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.ownership_start_date', language, t))
        .when('ownershipEndDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('ownershipEndDate'),
              getDateNotAfterTranslation(
                'estate_unit.field.ownership_start_date',
                'estate_unit.field.ownership_end_date',
                t,
              ),
            ),
        }),
      ownershipEndDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('estate_unit.field.ownership_end_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.ownership_end_date', language, t))
        .when('ownershipStartDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('ownershipStartDate'),
              getDateNotBeforeTranslation(
                'estate_unit.field.ownership_end_date',
                'estate_unit.field.ownership_start_date',
                t,
              ),
            ),
        }),
      ownershipType: string().required(getRequiredTranslation('estate_unit.field.ownership_type', t)),
      ownershipPercent: number()
        .nullable()
        .when('ownershipType', {
          is: EstateUnitOwnershipType.Property,
          then: (schema) => schema.required(getRequiredTranslation('estate_unit.field.ownership_percentage', t)),
        }),
      usageType: object().required(getRequiredTranslation('estate_unit.field.usage_type', t)),
    },
    [['ownershipStartDate', 'ownershipEndDate']],
  );
