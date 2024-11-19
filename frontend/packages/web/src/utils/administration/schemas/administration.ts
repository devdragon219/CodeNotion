import { TFunction } from 'i18next';

import { AdministrationFragment } from '../../../gql/RealGimm.Web.Administration.fragment';
import { getAdministrationAdministrationsSchema } from './administrations';
import { getAdministrationEstateSchema } from './estate';

export const getAdministrationSchema = (administrations: AdministrationFragment[], language: string, t: TFunction) =>
  getAdministrationEstateSchema(t).concat(getAdministrationAdministrationsSchema(administrations, language, t));
