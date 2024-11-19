import { AddressType } from '@realgimm5/frontend-common/gql/types';

import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';

export const getSubjectTaxId = (subject?: SubjectFragment | null) => {
  switch (subject?.__typename) {
    case 'PhysicalSubject':
      return subject.birthCountryTaxIdCode;
    default:
      return subject?.additionalTaxIdCode;
  }
};

export const getSubjectVatNumber = (subject?: SubjectFragment | null) => {
  switch (subject?.__typename) {
    case 'PhysicalSubject':
      return subject.professionalTaxIdCode;
    default:
      return subject?.baseCountryTaxIdCode;
  }
};

export const getSubjectTaxIdOrVatNumber = (subject?: SubjectFragment | null) =>
  getSubjectTaxId(subject) ?? getSubjectVatNumber(subject);

export const getSubjectLegalResidentialAddress = (subject?: SubjectFragment | null) =>
  subject?.addresses.find(({ addressType }) => addressType === AddressType.LegalResidential);
