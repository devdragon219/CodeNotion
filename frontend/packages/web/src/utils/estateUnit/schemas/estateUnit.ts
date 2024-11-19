import { TFunction } from 'i18next';

import { getEstateUnitDocumentsSchema } from './documents';
import { getEstateUnitEstateSchema } from './estate';
import { getEstateUnitGeneralDataSchema } from './generalData';
import { getEstateUnitOfficialActSchema } from './officialAct';
import { getEstateUnitRepossessionSchema } from './repossession';

export const getEstateUnitSchema = (language: string, t: TFunction, minDate?: Date) =>
  getEstateUnitEstateSchema(t)
    .concat(getEstateUnitGeneralDataSchema(language, t, minDate))
    .concat(getEstateUnitOfficialActSchema(language, t))
    .concat(getEstateUnitRepossessionSchema(language, t))
    .concat(getEstateUnitDocumentsSchema(language, t));
