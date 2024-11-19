import {
  AddressType,
  CompanyGroup,
  ContactInfoType,
  EntryStatus,
  LegalSubjectType,
  TaxStatusType,
} from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { isAfter, parseISO } from 'date-fns';
import { TFunction } from 'i18next';

import { LegalNature } from '../../enums/LegalNature';
import { SubjectType } from '../../enums/SubjectType';
import { AddressFragment } from '../../gql/RealGimm.Web.Address.fragment';
import { ContactFragment } from '../../gql/RealGimm.Web.Contact.fragment';
import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { SubjectCategoryFragment } from '../../gql/RealGimm.Web.SubjectCategory';
import { getCountryName, getSortedCountryCodes } from '../countryUtils';
import { getSubjectTaxId, getSubjectVatNumber } from './subjectUtils';

export const getSubjectsColumns = (
  categories: SubjectCategoryFragment[],
  language: string,
  t: TFunction,
): TableColumn<SubjectFragment>[] => {
  const getAddressOfType = (type: AddressType, addresses: AddressFragment[]) =>
    addresses.find(({ addressType }) => addressType === type);
  const getContactOfType = (type: ContactInfoType, contacts: ContactFragment[]) =>
    contacts.find(({ contactInfoType }) => contactInfoType === type);

  return [
    {
      id: 'internalCode',
      label: 'subject.field.subject_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'name',
      label: 'subject.field.name',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => row.name,
    },
    {
      id: 'subjectType',
      label: 'subject.field.subject_type',
      options: Object.values(SubjectType),
      enableColumnFilter: true,
      getOptionLabel: (option) => t(`core.enum.subject_type.${option as SubjectType}`),
      getRowValue: (row) => {
        switch (row.__typename) {
          case 'ManagementSubject':
            return SubjectType.ManagementSubject;
          default:
            return SubjectType.Other;
        }
      },
    },
    {
      id: 'legalNature',
      label: 'subject.field.legal_nature',
      options: Object.values(LegalNature),
      enableColumnFilter: true,
      getOptionLabel: (option) => t(`core.enum.legal_nature.${option as LegalNature}`),
      getRowValue: (row) => {
        switch (row.__typename) {
          case 'LegalSubject':
            return row.legalSubjectType === LegalSubjectType.ActualLegalSubject
              ? LegalNature.LegalPerson
              : LegalNature.Other;
          case 'ManagementSubject':
            return LegalNature.LegalPerson;
          case 'PhysicalSubject':
            return LegalNature.PhysicalPerson;
        }
      },
    },
    {
      id: 'entryStatus',
      label: 'subject.field.status',
      multiple: true,
      options: Object.values(EntryStatus),
      enableColumnFilter: true,
      getOptionLabel: (option) => t(`common.enum.entry_status.${option as EntryStatus}`),
    },
    {
      id: 'vatNumber',
      label: 'subject.field.vat_number',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => getSubjectVatNumber(row),
    },
    {
      id: 'taxIdCode',
      label: 'subject.field.tax_id_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => getSubjectTaxId(row),
    },
    {
      id: 'legalResidentialAddress.countryISO',
      label: 'subject.field.address_country',
      multiple: true,
      options: getSortedCountryCodes(language),
      enableColumnFilter: true,
      getOptionLabel: (countryCode) => getCountryName(countryCode as string, language),
      getRowValue: (row) => getAddressOfType(AddressType.LegalResidential, row.addresses)?.countryISO,
    },
    {
      id: 'legalResidentialAddress.cityName',
      label: 'subject.field.address_city',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => getAddressOfType(AddressType.LegalResidential, row.addresses)?.cityName,
    },
    {
      id: 'legalResidentialAddress.toponymy',
      initialVisibility: 'hidden',
      label: 'subject.field.address_toponymy',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) =>
        [
          getAddressOfType(AddressType.LegalResidential, row.addresses)?.toponymy,
          getAddressOfType(AddressType.LegalResidential, row.addresses)?.numbering,
        ]
          .filter((it) => !!it)
          .join(', '),
    },
    {
      id: 'legalResidentialAddress.countyName',
      initialVisibility: 'hidden',
      label: 'subject.field.address_county',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => getAddressOfType(AddressType.LegalResidential, row.addresses)?.countyName,
    },
    {
      id: 'owningMgmtSubjects',
      initialVisibility: 'hidden',
      label: 'subject.field.owning_management_subjects',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      getRowValue: (row) =>
        row.owningMgmtSubjects
          .map(({ main }) => main.name)
          .filter((it) => it.length !== 0)
          .join(', '),
    },
    {
      id: 'category',
      initialVisibility: 'hidden',
      label: 'subject.field.subject_category',
      multiple: categories.length > 2,
      options: categories.map(({ id }) => id),
      getOptionLabel: (option) => categories.find(({ id }) => id === option)?.name ?? '',
      enableColumnFilter: true,
      getRowValue: (row) =>
        row.categories.filter(({ function: { isCompanyGroup } }) => !isCompanyGroup).map(({ id }) => id),
    },
    {
      id: 'externalSourceCode',
      initialVisibility: 'hidden',
      label: 'subject.field.external_subject_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'companyGroupParent.main.name',
      initialVisibility: 'hidden',
      label: 'subject.field.company_group_parent',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      getRowValue: (row) => {
        switch (row.__typename) {
          case 'LegalSubject':
          case 'ManagementSubject':
            return row.companyGroupParent?.main.name;
          default:
            return undefined;
        }
      },
    },
    {
      id: 'companyGroupParent.groupRelationType',
      initialVisibility: 'hidden',
      label: 'subject.field.group_leader',
      enableColumnFilter: true,
      type: 'boolean',
      getRowValue: (row) => {
        switch (row.__typename) {
          case 'LegalSubject':
          case 'ManagementSubject':
            return CompanyGroup.Leader === row.companyGroupParent?.groupRelationType;
          default:
            return undefined;
        }
      },
    },
    {
      id: 'interGroupSignature',
      initialVisibility: 'hidden',
      label: 'subject.field.signature',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => {
        switch (row.__typename) {
          case 'LegalSubject':
            return row.interGroupSignature;
          default:
            return undefined;
        }
      },
    },
    {
      id: 'splitPayment',
      initialVisibility: 'hidden',
      label: 'subject.field.split_payment',
      type: 'boolean',
      enableColumnFilter: true,
      getRowValue: (row) =>
        row.taxStatuses.some(
          (it) =>
            it.taxStatusType === TaxStatusType.ApplySplitPayment &&
            (!it.until || isAfter(parseISO(it.until), Date.now())),
        ),
    },
    {
      id: 'email',
      initialVisibility: 'hidden',
      label: 'subject.field.contact_email',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      getRowValue: (row) => getContactOfType(ContactInfoType.EMail, row.contacts)?.contactInfo,
    },
    {
      id: 'registeredEmail',
      initialVisibility: 'hidden',
      label: 'subject.field.contact_registered_email',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      getRowValue: (row) => getContactOfType(ContactInfoType.RegisteredEmail, row.contacts)?.contactInfo,
    },
  ];
};
