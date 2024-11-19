import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getAddressSchema = (required: boolean, t: TFunction) =>
  object().shape({
    addressType: string().required(getRequiredTranslation('component.addresses_field.field.type', t)),
    countryISO: string()
      .nullable()
      .requiredIf(required, getRequiredTranslation('component.addresses_field.field.country', t)),
    city: object().shape({
      name: string().requiredIf(required, getRequiredTranslation('component.addresses_field.field.city', t)),
    }),
    toponymy: string().requiredIf(required, getRequiredTranslation('component.addresses_field.field.toponymy', t)),
    numbering: string().requiredIf(required, getRequiredTranslation('component.addresses_field.field.number', t)),
    localPostCode: string().requiredIf(
      required,
      getRequiredTranslation('component.addresses_field.field.postal_code', t),
    ),
  });

export const getAddressesSchema = (required: boolean, t: TFunction) =>
  object().shape({
    addresses: array().of(getAddressSchema(required, t)),
  });
