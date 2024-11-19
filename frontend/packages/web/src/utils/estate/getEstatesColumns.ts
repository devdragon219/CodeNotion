import { AsstAddressType, EstateOwnership, EstateStatus, EstateType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';
import { EstateFormInput } from '../../interfaces/FormInputs/Estate';
import { getCountryName, getSortedCountryCodes } from '../countryUtils';
import { isAsstAddressFragment } from '../typeNarrowings/isAsstAddressFragment';
import { isEstateFragment } from '../typeNarrowings/isEstateFragment';

export const getEstatesColumns = <T extends EstateFragment | EstateFormInput = EstateFragment>(
  language: string,
  t: TFunction,
  options?: {
    useFilter?: boolean;
    useStatus?: boolean;
  },
): TableColumn<T>[] => {
  const useFilter = options?.useFilter ?? true;
  const useStatus = options?.useStatus ?? true;

  const getAddressOfType = (type: AsstAddressType, addresses: (AsstAddressFragment | AddressFormInput)[]) =>
    addresses.find(({ addressType }) => addressType === type);

  return [
    {
      id: 'internalCode',
      label: 'estate.field.estate_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'name',
      label: 'estate.field.estate_name',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'type',
      label: 'estate.field.estate_type',
      multiple: true,
      options: Object.values(EstateType),
      enableColumnFilter: useFilter,
      getOptionLabel: (option) => t(`common.enum.estate_type.${option as EstateType}`),
      getRowValue: (row) => (isEstateFragment(row) ? row.type : row.estateType),
    },
    ...((useStatus
      ? [
          {
            id: 'status',
            label: 'estate.field.estate_status',
            options: Object.values(EstateStatus),
            enableColumnFilter: useFilter,
            getOptionLabel: (option) => t(`common.enum.estate_status.${option as EstateStatus}`),
          },
        ]
      : []) as TableColumn<T>[]),
    {
      id: 'managementSubjectName',
      label: 'estate.field.management_subject',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.managementSubject?.name,
    },
    {
      id: 'primaryAddress.toponymy',
      label: 'estate.field.address_toponymy',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) =>
        [
          getAddressOfType(AsstAddressType.Primary, row.addresses)?.toponymy,
          getAddressOfType(AsstAddressType.Primary, row.addresses)?.numbering,
        ]
          .filter((it) => !!it)
          .join(', '),
    },
    {
      id: 'primaryAddress.cityName',
      label: 'estate.field.address_city',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => {
        const address = getAddressOfType(AsstAddressType.Primary, row.addresses);
        return address ? (isAsstAddressFragment(address) ? address.cityName : address.city.name) : null;
      },
    },
    {
      id: 'primaryAddress.localPostCode',
      label: 'estate.field.address_postal_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => getAddressOfType(AsstAddressType.Primary, row.addresses)?.localPostCode,
    },
    {
      id: 'primaryAddress.countryISO',
      label: 'estate.field.address_country',
      multiple: true,
      options: getSortedCountryCodes(language),
      enableColumnFilter: useFilter,
      getOptionLabel: (option) => getCountryName(option as string, language),
      getRowValue: (row) => getAddressOfType(AsstAddressType.Primary, row.addresses)?.countryISO,
    },
    {
      id: 'externalCode',
      initialVisibility: 'hidden',
      label: 'estate.field.external_estate_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'surfaceAreaSqM',
      type: 'number',
      initialVisibility: 'hidden',
      label: 'estate.field.estate_surface',
      enableColumnFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'estateUnits',
      initialVisibility: 'hidden',
      label: 'estate.field.estate_units_counter',
      getRowValue: (row) => (isEstateFragment(row) ? row.estateUnits.length : null),
    },
    {
      id: 'floors',
      initialVisibility: 'hidden',
      label: 'estate.field.floors_counter',
      getRowValue: (row) => row.floors.length,
    },
    {
      id: 'mainUsageType',
      initialVisibility: 'hidden',
      label: 'estate.field.main_usage_type',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.mainUsageType?.name,
    },
    {
      id: 'usageType',
      initialVisibility: 'hidden',
      label: 'estate.field.usage_type',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.usageType?.name,
    },
    {
      id: 'ownership',
      initialVisibility: 'hidden',
      label: 'estate.field.ownership',
      multiple: true,
      options: Object.values(EstateOwnership),
      enableColumnFilter: useFilter,
      getOptionLabel: (option) => t(`common.enum.estate_ownership.${option as EstateOwnership}`),
    },
    {
      id: 'buildYear',
      type: 'number',
      initialVisibility: 'hidden',
      label: 'estate.field.build_year',
      enableColumnFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.buildYear,
    },
    {
      id: 'primaryAddress.countyName',
      initialVisibility: 'hidden',
      label: 'estate.field.address_county',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => getAddressOfType(AsstAddressType.Primary, row.addresses)?.countyName,
    },
  ];
};
