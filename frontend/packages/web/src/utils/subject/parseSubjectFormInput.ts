import {
  BankAccountCodeType,
  BankAccountInput,
  BankAccountType,
  CompanyGroupInput,
  HeirInput,
  LegalSubjectInput,
  LegalSubjectType,
  ManagementSubjectInput,
  OfficerInput,
  PhysicalSubjectInput,
  TaxStatusInput,
} from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { LegalNature } from '../../enums/LegalNature';
import { SubjectType } from '../../enums/SubjectType';
import { SubjectFieldValue } from '../../interfaces/FieldValues/Subject';
import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';
import {
  SubjectBankAccountFormInput,
  SubjectCategoryFormInput,
  SubjectCompanyGroupFormInput,
  SubjectFormInput,
  SubjectHeirFormInput,
  SubjectOfficerFormInput,
  SubjectTaxStatusFormInput,
} from '../../interfaces/FormInputs/Subject';
import { parseAddressFormInputToAddressInput } from '../components/addressesField/parseAddressFormInput';
import { getAddressesOrEmpty } from '../input/getAddressesOrEmpty';
import { getContactsOrEmpty } from '../input/getContactsOrEmpty';

export const parseSubjectFormInputToSubjectInput = (subject: SubjectFormInput, subjectType: SubjectType) => {
  const getAddressOrNull = (value: AddressFormInput) =>
    [value.countryISO, value.city.name, value.countyName].some((it) => it && it.trim().length !== 0)
      ? parseAddressFormInputToAddressInput(value)
      : null;
  const getBankAccountsOrEmpty = (value: SubjectBankAccountFormInput[]) =>
    value.filter(({ accountHolder, notes, referenceCode }) =>
      [referenceCode, accountHolder, notes].some((it) => it && it.trim().length !== 0),
    );
  const getCategoriesIdsOrEmpty = (value: SubjectCategoryFormInput[]) =>
    value.reduce<number[]>((acc, { categoryId }) => (categoryId ? [...acc, categoryId] : acc), []);
  const getCompanyGroupOrNull = (value: SubjectCompanyGroupFormInput, strict = true): CompanyGroupInput | null =>
    value.relation && (!strict || value.companyGroupId)
      ? {
          id: value.companyGroupId,
          groupRelation: value.relation,
        }
      : null;
  const getHeirsOrEmpty = (value: SubjectHeirFormInput[]) => value.filter(({ heir }) => !!heir);
  const getOfficersOrEmpty = (value: SubjectOfficerFormInput[]) =>
    value.filter(({ officer, officerType }) => !!officer && !!officerType);
  const getOwnerManagementSubjectIdsOrEmpty = (value: SubjectFieldValue[]) =>
    value.reduce<number[]>((acc, { id }) => (id ? [...acc, id] : acc), []);

  const parseBankAccountFormInput = (value: SubjectBankAccountFormInput): BankAccountInput => ({
    accountHolder: value.accountHolder,
    bankAccountType: BankAccountType.Main,
    id: value.bankAccountId,
    notes: value.notes,
    referenceCode: value.referenceCode,
    referenceCodeType: BankAccountCodeType.Iban,
  });
  const parseHeirInput = (value: SubjectHeirFormInput): HeirInput => ({
    id: value.heir!.id,
    since: parseDateToString(value.since),
  });
  const parseOfficerInput = (value: SubjectOfficerFormInput): OfficerInput => ({
    officerId: value.officer!.id,
    officerType: value.officerType!,
    since: parseDateToString(value.since),
    until: parseDateToString(value.until),
  });
  const parseTaxStatusInput = (value: SubjectTaxStatusFormInput): TaxStatusInput => ({
    id: value.taxStatusId,
    since: parseDateToString(value.since),
    taxStatusType: value.taxStatusType!,
    until: parseDateToString(value.until),
  });

  const parseSubjectInputToLegalSubjectInput = (subject: SubjectFormInput): LegalSubjectInput => ({
    additionalGovIdCode: getStringOrNull(subject.additionalGovIdCode),
    additionalTaxIdCode: getStringOrNull(subject.additionalTaxIdCode),
    addresses: getAddressesOrEmpty(subject.addresses).map(parseAddressFormInputToAddressInput),
    bankAccounts: getBankAccountsOrEmpty(subject.bankAccounts).map(parseBankAccountFormInput),
    bankingId1: getStringOrNull(subject.bankingId1),
    bankingId2: getStringOrNull(subject.bankingId2),
    baseCountryTaxIdCode: getStringOrNull(subject.baseCountryTaxIdCode),
    businessStart: parseDateToString(subject.businessStart),
    categoriesIds: getCategoriesIdsOrEmpty(subject.categories),
    closureDate: parseDateToString(subject.closureDate),
    companiesHouseIdCode: getStringOrNull(subject.companiesHouseIdCode),
    companyGroup: getCompanyGroupOrNull(subject.companyGroup),
    contacts: [...getContactsOrEmpty(subject.contacts.emails), ...getContactsOrEmpty(subject.contacts.phones)],
    entryStatus: subject.entryStatus!,
    externalSourceCode: getStringOrNull(subject.externalSourceCode),
    fullName: subject.fullName,
    id: subject.subjectId,
    interGroupSignature: getStringOrNull(subject.interGroupSignature),
    internalCode: subject.internalCode,
    legalSubjectType:
      subject.legalNature === LegalNature.LegalPerson
        ? LegalSubjectType.ActualLegalSubject
        : LegalSubjectType.UnrecognizedBusinessSociety,
    officers: getOfficersOrEmpty(subject.officers).map(parseOfficerInput),
    ownerManagementSubjectIds: getOwnerManagementSubjectIdsOrEmpty(subject.owningManagementSubjects),
    shareCapital: subject.shareCapital,
    shorthandDescription: getStringOrNull(subject.shorthandDescription),
    taxStatuses: [subject.taxStatusLandlordVat, subject.taxStatusSplitPayment, subject.taxStatusTenantVat].reduce<
      TaxStatusInput[]
    >((acc, taxStatus) => (taxStatus ? [...acc, parseTaxStatusInput(taxStatus)] : acc), []),
  });

  const parseSubjectInputToManagementSubjectInput = (subject: SubjectFormInput): ManagementSubjectInput => ({
    additionalGovIdCode: getStringOrNull(subject.additionalGovIdCode),
    additionalTaxIdCode: getStringOrNull(subject.additionalTaxIdCode),
    addresses: getAddressesOrEmpty(subject.addresses).map(parseAddressFormInputToAddressInput),
    bankAccounts: getBankAccountsOrEmpty(subject.bankAccounts).map(parseBankAccountFormInput),
    bankingId1: getStringOrNull(subject.bankingId1),
    bankingId2: getStringOrNull(subject.bankingId2),
    baseCountryTaxIdCode: getStringOrNull(subject.baseCountryTaxIdCode),
    businessStart: parseDateToString(subject.businessStart),
    categoriesIds: getCategoriesIdsOrEmpty(subject.categories),
    closureDate: parseDateToString(subject.closureDate),
    companiesHouseIdCode: getStringOrNull(subject.companiesHouseIdCode),
    companyGroup: getCompanyGroupOrNull(subject.companyGroup, false),
    contacts: [...getContactsOrEmpty(subject.contacts.emails), ...getContactsOrEmpty(subject.contacts.phones)],
    entryStatus: subject.entryStatus!,
    externalSourceCode: getStringOrNull(subject.externalSourceCode),
    fullName: subject.fullName,
    id: subject.subjectId,
    interGroupSignature: getStringOrNull(subject.interGroupSignature),
    internalCode: subject.internalCode,
    managementCode: getStringOrNull(subject.managementCode),
    officers: getOfficersOrEmpty(subject.officers).map(parseOfficerInput),
    shareCapital: subject.shareCapital,
    shorthandDescription: getStringOrNull(subject.shorthandDescription),
    taxStatuses: [subject.taxStatusLandlordVat, subject.taxStatusSplitPayment, subject.taxStatusTenantVat].reduce<
      TaxStatusInput[]
    >((acc, taxStatus) => (taxStatus ? [...acc, parseTaxStatusInput(taxStatus)] : acc), []),
  });

  const parseSubjectInputToPhysicalSubjectInput = (subject: SubjectFormInput): PhysicalSubjectInput => ({
    addresses: getAddressesOrEmpty(subject.addresses).map(parseAddressFormInputToAddressInput),
    bankAccounts: getBankAccountsOrEmpty(subject.bankAccounts).map(parseBankAccountFormInput),
    birthCountryTaxIdCode: getStringOrNull(subject.birthCountryTaxIdCode),
    birthDate: parseDateToString(subject.birthDate),
    birthLocation: getAddressOrNull(subject.birthLocation),
    birthSex: subject.birthSex,
    categoriesIds: getCategoriesIdsOrEmpty(subject.categories),
    closureDate: parseDateToString(subject.closureDate),
    contacts: [...getContactsOrEmpty(subject.contacts.emails), ...getContactsOrEmpty(subject.contacts.phones)],
    entryStatus: subject.entryStatus!,
    externalSourceCode: getStringOrNull(subject.externalSourceCode),
    firstName: getStringOrNull(subject.firstName),
    heirs: getHeirsOrEmpty(subject.heirs).map(parseHeirInput),
    id: subject.subjectId,
    internalCode: subject.internalCode,
    lastName: getStringOrNull(subject.lastName),
    officers: getOfficersOrEmpty(subject.officers).map(parseOfficerInput),
    ownerManagementSubjectIds: getOwnerManagementSubjectIdsOrEmpty(subject.owningManagementSubjects),
    professionalTaxIdCode: getStringOrNull(subject.professionalTaxIdCode),
    taxStatuses: [subject.taxStatusLandlordVat, subject.taxStatusSplitPayment, subject.taxStatusTenantVat].reduce<
      TaxStatusInput[]
    >((acc, taxStatus) => (taxStatus ? [...acc, parseTaxStatusInput(taxStatus)] : acc), []),
  });

  if (subjectType === SubjectType.ManagementSubject) {
    return parseSubjectInputToManagementSubjectInput(subject);
  } else if (subject.legalNature === LegalNature.PhysicalPerson) {
    return parseSubjectInputToPhysicalSubjectInput(subject);
  } else {
    return parseSubjectInputToLegalSubjectInput(subject);
  }
};
