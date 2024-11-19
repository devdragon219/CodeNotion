import {
  AddressType,
  CompanyGroup,
  ContactInfoType,
  OfficerType,
  TaxStatusType,
} from '@realgimm5/frontend-common/gql/types';
import { getEmptyContactFormInput } from '@realgimm5/frontend-common/utils';

import { LegalNature } from '../../enums/LegalNature';
import { SubjectType } from '../../enums/SubjectType';
import {
  SubjectBankAccountFormInput,
  SubjectCompanyGroupFormInput,
  SubjectFormInput,
  SubjectHeirFormInput,
  SubjectOfficerFormInput,
  SubjectTaxStatusFormInput,
} from '../../interfaces/FormInputs/Subject';
import { getEmptyAddressFormInput } from '../components/addressesField/initialValues';

export const getEmptySubjectBankAccountFormInput = (): SubjectBankAccountFormInput => ({
  accountHolder: '',
  bankAccountId: null,
  notes: '',
  referenceCode: '',
});

export const getEmptySubjectCompanyGroupFormInput = (): SubjectCompanyGroupFormInput => ({
  companyGroupId: null,
  name: '',
  relation: CompanyGroup.Member,
});

export const getEmptySubjectOfficerFormInput = (officerType: OfficerType | null = null): SubjectOfficerFormInput => ({
  officerType,
  officer: null,
  since: null,
  until: null,
});

export const getEmptySubjectHeirFormInput = (): SubjectHeirFormInput => ({
  heir: null,
  since: null,
});

export const getEmptySubjectTaxStatusFormInput = (taxStatusType: TaxStatusType): SubjectTaxStatusFormInput => ({
  since: null,
  taxStatusId: null,
  taxStatusType,
  until: null,
});

export const getEmptySubjectFormInput = (subjectType: SubjectType): SubjectFormInput => ({
  additionalGovIdCode: '',
  additionalGovIdCountyName: '',
  additionalTaxIdCode: '',
  addresses: [getEmptyAddressFormInput(AddressType.LegalResidential)],
  bankAccounts: [],
  bankingId1: '',
  bankingId2: '',
  baseCountryTaxIdCode: '',
  birthCountryTaxIdCode: '',
  birthDate: null,
  birthLocation: getEmptyAddressFormInput(AddressType.BirthLocation),
  birthSex: null,
  businessStart: null,
  categories: [],
  closureDate: null,
  companyGroup: getEmptySubjectCompanyGroupFormInput(),
  companiesHouseIdCode: '',
  companiesHouseIdCountyName: '',
  contacts: {
    emails: [
      getEmptyContactFormInput(ContactInfoType.EMail),
      getEmptyContactFormInput(ContactInfoType.RegisteredEmail),
    ],
    phones: [
      getEmptyContactFormInput(ContactInfoType.MobilePhone),
      getEmptyContactFormInput(ContactInfoType.LandlinePhone),
    ],
  },
  documents: {
    identities: [],
    others: [],
  },
  entryStatus: null,
  externalSourceCode: '',
  firstName: '',
  fullName: '',
  heirs: [],
  interGroupSignature: '',
  internalCode: '',
  lastName: '',
  legalNature: subjectType === SubjectType.ManagementSubject ? LegalNature.LegalPerson : null,
  managementCode: '',
  name: '',
  officers: [],
  owningManagementSubjects: [],
  professionalTaxIdCode: '',
  shareCapital: null,
  shorthandDescription: '',
  subjectId: null,
  taxStatusLandlordVat: null,
  taxStatusSplitPayment: null,
  taxStatusTenantVat: null,
});
