import { AddressType, AdministrationType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { AdministrationFragment } from '../../gql/RealGimm.Web.Administration.fragment';
import { parseAddressToString } from '../addressUtils';

export const getAdministrationsColumns = (t: TFunction, language: string): TableColumn<AdministrationFragment>[] => [
  {
    id: 'estateInternalCode',
    label: 'estate.field.estate_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.estate.internalCode,
  },
  {
    id: 'administrationType',
    label: 'administration.field.administration_type',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(AdministrationType),
    getOptionLabel: (option) => t(`common.enum.administration_type.${option as AdministrationType}`),
  },
  {
    id: 'administrationSubjectName',
    label: 'administration.field.administrator',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.administratorSubject.name,
  },
  {
    id: 'since',
    label: 'administration.field.start_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'until',
    label: 'administration.field.end_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'isPaymentDataIncluded',
    label: 'administration.field.is_payment_data_included',
    type: 'boolean',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'bankAccount.referenceCode',
    label: 'subject.field.bank_account_number',
  },
  {
    id: 'bankAccount.accountHolder',
    label: 'administration.field.bank_account_holder',
  },
  {
    id: 'administratorSubject.addresses',
    label: 'subject.field.address_toponymy',
    getRowValue: (row) =>
      parseAddressToString(
        row.administratorSubject.addresses.find((it) => it.addressType === AddressType.LegalResidential),
        language,
      ),
  },
];
