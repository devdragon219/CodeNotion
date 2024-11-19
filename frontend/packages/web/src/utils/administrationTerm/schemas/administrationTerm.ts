import { TFunction } from 'i18next';

import { AdministrationTermFragment } from '../../../gql/RealGimm.Web.AdministrationTerm.fragment';
import { AdministrationFormInput } from '../../../interfaces/FormInputs/Administration';
import { AdministrationTermFormInput } from '../../../interfaces/FormInputs/AdministrationTerm';
import { getAdministrationTermGeneralDataSchema } from './generalData';
import { getAdministrationTermInstallmentsSchema } from './installments';

export const getAdministrationTermSchema = (
  administrationTerm: AdministrationTermFormInput,
  existingAdministrationTerms: AdministrationTermFragment[],
  language: string,
  t: TFunction,
  administration?: AdministrationFormInput,
) =>
  getAdministrationTermGeneralDataSchema(existingAdministrationTerms, language, t, administration).concat(
    getAdministrationTermInstallmentsSchema(
      administrationTerm.since,
      administrationTerm.until,
      administrationTerm.expectedAmount ?? 0,
      administrationTerm.installments,
      language,
      t,
    ),
  );
