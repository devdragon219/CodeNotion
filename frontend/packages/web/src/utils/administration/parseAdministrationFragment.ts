import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { AdministrationDetailFragment } from '../../gql/RealGimm.Web.Administration.fragment';
import { AdministrationFormInput } from '../../interfaces/FormInputs/Administration';

export const parseAdministrationToAdministrationFormInput = (
  administration: AdministrationDetailFragment,
): AdministrationFormInput => ({
  administrationId: administration.id,
  administrationType: administration.administrationType,
  administratorSubject: {
    id: administration.administratorSubject.id,
    name: administration.administratorSubject.name,
    bankAccounts: administration.administratorSubject.bankAccounts,
    addresses: administration.administratorSubject.addresses,
    contacts: administration.administratorSubject.contacts,
  },
  bankAccount: administration.bankAccount ?? null,
  isPaymentDataIncluded: administration.isPaymentDataIncluded,
  hasTerms: administration.terms.length > 0,
  estate: {
    id: administration.estate.id,
    internalCode: administration.estate.internalCode,
    name: administration.estate.name ?? '',
    mainUsageTypeName: administration.estate.mainUsageType.name,
  },
  notes: administration.notes ?? '',
  paymentType: administration.paymentType,
  since: parseStringToDate(administration.since),
  until: parseStringToDate(administration.until),
});
