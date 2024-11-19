import { EntryStatus, MeteringType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';
import { ReactElement } from 'react';

import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { UtilityServiceFragment } from '../../gql/RealGimm.Web.UtilityService.fragment';
import { getSubjectVatNumber } from '../subject/subjectUtils';

export const getUtilityServicesColumns = (
  t: TFunction,
  showAllEstates: (row: UtilityServiceFragment) => ReactElement,
  showAllEstateUnits: (row: UtilityServiceFragment) => ReactElement,
): TableColumn<UtilityServiceFragment>[] => [
  {
    id: 'internalCode',
    label: 'utility_service.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'referenceSubjectName',
    label: 'utility_service.field.reference_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.referenceSubject.name,
  },
  {
    id: 'orgUnitName',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    label: 'utility_service.field.org_unit',
    getRowValue: (row) => row.orgUnit.name,
  },
  {
    id: 'utilityType',
    label: 'utility_service.field.utility_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => `${row.utilityType.internalCode} - ${row.utilityType.description}`,
  },
  {
    id: 'utilityType.category',
    label: 'utility_service.field.utility_type_category',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(UtilityCategory),
    getOptionLabel: (option) => t(`common.enum.utility_category.${option as UtilityCategory}`),
  },
  {
    id: 'providerSubjectName',
    label: 'utility_service.field.provider_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.providerSubject.name,
  },
  {
    id: 'providerSubjectInternalCode',
    label: 'utility_service.field.provider_subject_internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.providerSubject.internalCode,
  },
  {
    id: 'providerSubjectVatNumber',
    label: 'utility_service.field.provider_subject_vat_number',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => getSubjectVatNumber(row.providerSubject as SubjectFragment),
  },
  {
    id: 'status',
    label: 'utility_service.field.status',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(EntryStatus),
    getOptionLabel: (option) => t(`common.enum.entry_status.${option as EntryStatus}`),
  },
  {
    id: 'activationDate',
    type: 'date',
    label: 'utility_service.field.activation_date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'utilityContractCode',
    label: 'utility_service.field.utility_contract_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'utilityUserCode',
    label: 'utility_service.field.utility_user_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'utility_service.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'accountingItem',
    label: 'utility_service.field.accounting_item',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => `(${row.accountingItem.internalCode}) ${row.accountingItem.description}`,
  },
  {
    id: 'utilityType.meteringType',
    label: 'utility_service.field.utility_type_metering_type',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(MeteringType),
    getOptionLabel: (option) => t(`common.enum.metering_type.${option as MeteringType}`),
  },
  {
    id: 'isFreeMarket',
    type: 'boolean',
    label: 'utility_service.field.free_market',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'deposit',
    label: 'utility_service.field.deposit',
    type: 'currency',
    enableColumnFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'contractPowerNominal',
    label: 'utility_service.field.contract_power_nominal',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'contractPowerMaximum',
    label: 'utility_service.field.contract_power_maximum',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'utilityMeterSerial',
    label: 'utility_service.field.utility_meter_serial',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'contractNominalTension',
    label: 'utility_service.field.contract_nominal_tension',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'utilityDeliveryPointCode',
    label: 'utility_service.field.utility_delivery_point_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'estateInternalCode',
    label: 'utility_service.field.estates',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.estates.length === 0) {
        return '-';
      }
      return showAllEstates(row);
    },
  },
  {
    id: 'estateUnitInternalCode',
    label: 'utility_service.field.estate_units',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.estateUnits.length === 0) {
        return '-';
      }
      return showAllEstateUnits(row);
    },
  },
];
