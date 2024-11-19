import { AddressType, CompanyGroup, LegalSubjectType, TaxStatusType } from '@realgimm5/frontend-common/gql/types';
import { getContactsFormInput, parseStringToDate } from '@realgimm5/frontend-common/utils';

import { LegalNature } from '../../enums/LegalNature';
import { AddressFragment } from '../../gql/RealGimm.Web.Address.fragment';
import { SubjectDetailFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';
import { SubjectFormInput, SubjectTaxStatusFormInput } from '../../interfaces/FormInputs/Subject';
import { getEmptyAddressFormInput } from '../components/addressesField/initialValues';
import { parseAddressToAddressFormInput } from '../components/addressesField/parseAddressFragment';

export const parseSubjectToSubjectFormInput = (subject: SubjectDetailFragment): SubjectFormInput => {
  const getAdditionalGovIdCode = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.additionalGovIdCode ?? '';
      default:
        return '';
    }
  };
  const getAdditionalTaxIdCode = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.additionalTaxIdCode ?? '';
      default:
        return '';
    }
  };
  const getBankingId1 = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.bankingId1 ?? '';
      default:
        return '';
    }
  };
  const getBankingId2 = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.bankingId2 ?? '';
      default:
        return '';
    }
  };
  const getBaseCountryTaxIdCode = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.baseCountryTaxIdCode ?? '';
      default:
        return '';
    }
  };
  const getBusinessStart = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return parseStringToDate(subject.businessStart);
      default:
        return null;
    }
  };
  const getCompanyGroup = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return {
          companyGroupId: subject.companyGroupParent?.main.id ?? null,
          name: subject.companyGroupParent?.main.name ?? '',
          relation: subject.companyGroupParent?.groupRelationType ?? CompanyGroup.Member,
        };
      default:
        return {
          companyGroupId: null,
          name: '',
          relation: CompanyGroup.Member,
        };
    }
  };
  const getCompaniesHouseIdCode = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.companiesHouseIdCode ?? '';
      default:
        return '';
    }
  };
  const getFullName = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.fullName;
      default:
        return '';
    }
  };
  const getInterGroupSignature = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.interGroupSignature ?? '';
      default:
        return '';
    }
  };
  const getLegalNature = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
        return subject.legalSubjectType === LegalSubjectType.ActualLegalSubject
          ? LegalNature.LegalPerson
          : LegalNature.Other;
      case 'ManagementSubject':
        return LegalNature.LegalPerson;
      case 'PhysicalSubject':
        return LegalNature.PhysicalPerson;
      default:
        return null;
    }
  };
  const getShorthandDescription = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.shorthandDescription ?? '';
      default:
        return '';
    }
  };
  const getShareCapital = () => {
    switch (subject.__typename) {
      case 'LegalSubject':
      case 'ManagementSubject':
        return subject.shareCapital ?? null;
      default:
        return null;
    }
  };
  const getTaxStatus = (taxStatusType: TaxStatusType): SubjectTaxStatusFormInput | null => {
    const taxStatus = subject.taxStatuses.find((taxStatus) => taxStatus.taxStatusType === taxStatusType);
    if (!taxStatus) {
      return null;
    }

    return {
      since: parseStringToDate(taxStatus.since),
      taxStatusId: taxStatus.id,
      taxStatusType: taxStatus.taxStatusType,
      until: parseStringToDate(taxStatus.until),
    };
  };

  const parseAddressesIntoAddressInputs = (addresses: AddressFragment[]): AddressFormInput[] => {
    const legalResidential = addresses.find(({ addressType }) => addressType === AddressType.LegalResidential);
    const others = addresses.filter(({ addressType }) => addressType !== AddressType.LegalResidential);
    return [
      legalResidential
        ? parseAddressToAddressFormInput(legalResidential)
        : getEmptyAddressFormInput(AddressType.LegalResidential),
      ...others.map(parseAddressToAddressFormInput),
    ];
  };

  return {
    additionalGovIdCode: getAdditionalGovIdCode(),
    additionalGovIdCountyName: '',
    additionalTaxIdCode: getAdditionalTaxIdCode(),
    addresses: parseAddressesIntoAddressInputs(subject.addresses),
    bankAccounts: subject.bankAccounts.map((bankAccount) => ({
      accountHolder: bankAccount.accountHolder ?? '',
      bankAccountId: bankAccount.id,
      notes: bankAccount.notes ?? '',
      referenceCode: bankAccount.referenceCode ?? '',
    })),
    bankingId1: getBankingId1(),
    bankingId2: getBankingId2(),
    baseCountryTaxIdCode: getBaseCountryTaxIdCode(),
    birthCountryTaxIdCode: subject.__typename === 'PhysicalSubject' ? (subject.birthCountryTaxIdCode ?? '') : '',
    birthDate: subject.__typename === 'PhysicalSubject' ? parseStringToDate(subject.birthDate) : null,
    birthLocation:
      subject.__typename === 'PhysicalSubject' && subject.birthLocation
        ? parseAddressToAddressFormInput(subject.birthLocation)
        : getEmptyAddressFormInput(AddressType.BirthLocation),
    birthSex: subject.__typename === 'PhysicalSubject' ? (subject.birthSex ?? null) : null,
    businessStart: getBusinessStart(),
    categories: subject.categories.map((category) => ({
      categoryId: category.id,
      name: category.name,
    })),
    closureDate: parseStringToDate(subject.closureDate),
    companyGroup: getCompanyGroup(),
    companiesHouseIdCode: getCompaniesHouseIdCode(),
    companiesHouseIdCountyName: '',
    contacts: getContactsFormInput(subject.contacts),
    documents: {
      identities: [],
      others: [],
    },
    entryStatus: subject.entryStatus,
    externalSourceCode: subject.externalSourceCode ?? '',
    firstName: subject.__typename === 'PhysicalSubject' ? (subject.firstName ?? '') : '',
    fullName: getFullName(),
    heirs: subject.heirs.map((heir) => ({
      heir: {
        id: heir.subordinate.id,
        name: heir.subordinate.name,
      },
      since: parseStringToDate(heir.since),
    })),
    interGroupSignature: getInterGroupSignature(),
    internalCode: subject.internalCode,
    lastName: subject.__typename === 'PhysicalSubject' ? (subject.lastName ?? '') : '',
    legalNature: getLegalNature(),
    managementCode: subject.__typename === 'ManagementSubject' ? (subject.managementCode ?? '') : '',
    name: subject.name,
    officers: subject.officers.map((officer) => ({
      officerType: officer.officerRelationType ?? null,
      officer: {
        id: officer.subordinate.id,
        name: officer.subordinate.name,
      },
      since: parseStringToDate(officer.since),
      until: parseStringToDate(officer.until),
    })),
    owningManagementSubjects: subject.owningMgmtSubjects.map((owning) => ({
      id: owning.main.id,
      name: owning.main.name,
    })),
    professionalTaxIdCode: subject.__typename === 'PhysicalSubject' ? (subject.professionalTaxIdCode ?? '') : '',
    shareCapital: getShareCapital(),
    shorthandDescription: getShorthandDescription(),
    subjectId: subject.id,
    taxStatusLandlordVat: getTaxStatus(TaxStatusType.VatSubjectAsLandlord),
    taxStatusSplitPayment: getTaxStatus(TaxStatusType.ApplySplitPayment),
    taxStatusTenantVat: getTaxStatus(TaxStatusType.VatSubjectAsTenant),
  };
};
