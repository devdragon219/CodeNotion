import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getEstateUnitGroupGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('estate_unit_group.field.internal_code', t))
      .valid(canUseInternalCode, t('estate_unit_group.error.internal_code')),
    name: string().required(getRequiredTranslation('estate_unit_group.field.name', t)),
    managementSubject: object().required(getRequiredTranslation('estate_unit_group.field.management_subject', t)),
  });
