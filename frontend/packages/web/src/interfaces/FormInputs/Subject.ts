import { BirthSex, CompanyGroup, EntryStatus, OfficerType, TaxStatusType } from '@realgimm5/frontend-common/gql/types';
import { ContactsFormInput, DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { LegalNature } from '../../enums/LegalNature';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { AddressFormInput } from './Addresses';

export interface SubjectBankAccountFormInput {
  accountHolder: string;
  bankAccountId: number | null;
  notes: string;
  referenceCode: string;
}

export interface SubjectOfficerFormInput {
  officer: SubjectFieldValue | null;
  officerType: OfficerType | null;
  since: Date | null;
  until: Date | null;
}

export interface SubjectHeirFormInput {
  heir: SubjectFieldValue | null;
  since: Date | null;
}

export interface SubjectCategoryFormInput {
  categoryId: number | null;
  name: string;
}

export interface SubjectCompanyGroupFormInput {
  companyGroupId: number | null;
  name: string;
  relation: CompanyGroup | null;
}

export interface SubjectDocumentsFormInput {
  identities: DocumentFormInput[];
  others: DocumentFormInput[];
}

export interface SubjectTaxStatusFormInput {
  since: Date | null;
  taxStatusId: number | null;
  taxStatusType: TaxStatusType | null;
  until: Date | null;
}

export interface SubjectFormInput {
  additionalGovIdCode: string; // Legal & Management
  additionalGovIdCountyName: string; // Legal & Management
  additionalTaxIdCode: string; // Legal & Management
  addresses: AddressFormInput[]; // All
  bankAccounts: SubjectBankAccountFormInput[]; // All
  bankingId1: string; // Legal & Management
  bankingId2: string; // Legal & Management
  baseCountryTaxIdCode: string; // Legal & Management
  birthCountryTaxIdCode: string; // Physical
  birthDate: Date | null; // Physical
  birthLocation: AddressFormInput; // Physical
  birthSex: BirthSex | null; // Physical
  businessStart: Date | null; // Legal & Management
  categories: SubjectCategoryFormInput[]; // All
  closureDate: Date | null; // All
  companyGroup: SubjectCompanyGroupFormInput;
  companiesHouseIdCode: string; // Legal & Management
  companiesHouseIdCountyName: string; // Legal & Management
  contacts: ContactsFormInput; // All
  documents: SubjectDocumentsFormInput; // All
  entryStatus: EntryStatus | null; // All
  externalSourceCode: string; // All
  firstName: string; // Physical
  fullName: string; // Legal & Management
  heirs: SubjectHeirFormInput[]; // Physical
  interGroupSignature: string; // Management
  internalCode: string; // All
  lastName: string; // Physical
  legalNature: LegalNature | null; // All
  managementCode: string; // Management
  name: string; // All
  officers: SubjectOfficerFormInput[]; // All
  owningManagementSubjects: SubjectFieldValue[]; // Legal & Physical
  professionalTaxIdCode: string; // Physical
  shareCapital: number | null; // Legal & Management
  shorthandDescription: string; // Legal & Management
  subjectId: number | null; // All
  taxStatusLandlordVat: SubjectTaxStatusFormInput | null; // Management
  taxStatusSplitPayment: SubjectTaxStatusFormInput | null; // Management
  taxStatusTenantVat: SubjectTaxStatusFormInput | null; // All
}
