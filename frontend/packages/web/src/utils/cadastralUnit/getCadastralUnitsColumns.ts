import { CadastralUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { CadastralUnitFragment } from '../../gql/RealGimm.Web.CadastralUnit.fragment';
import { getCountryName, getSortedCountryCodes } from '../countryUtils';
import { parseCadastralCoordinatesToString } from './parseCadastralCoordinatesToString';

export const getCadastralUnitsColumns = (
  language: string,
  t: TFunction,
  options?: {
    useStatus?: boolean;
  },
): TableColumn<CadastralUnitFragment>[] => {
  const useStatus = options?.useStatus ?? true;

  return [
    {
      id: 'internalCode',
      label: 'cadastral_unit.field.cadastral_unit_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'estateUnit.internalCode',
      label: 'cadastral_unit.field.estate_unit_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'estateUnit.estate.internalCode',
      label: 'cadastral_unit.field.estate_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'type',
      label: 'cadastral_unit.field.cadastral_unit_type',
      multiple: true,
      options: Object.values(EstateUnitType),
      enableColumnFilter: true,
      getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
    },
    {
      id: 'since',
      type: 'date',
      label: 'cadastral_unit.field.since',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'until',
      type: 'date',
      label: 'cadastral_unit.field.until',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'address.toponymy',
      label: 'cadastral_unit.field.address_toponymy',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => [row.address.toponymy, row.address.numbering].filter((it) => !!it).join(', '),
    },
    {
      id: 'address.cityName',
      label: 'cadastral_unit.field.address_city',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'address.countryISO',
      label: 'cadastral_unit.field.address_country',
      multiple: true,
      options: getSortedCountryCodes(language),
      enableColumnFilter: true,
      getOptionLabel: (countryCode) => getCountryName(countryCode as string, language),
    },
    {
      id: 'address.countyName',
      initialVisibility: 'hidden',
      label: 'cadastral_unit.field.address_county',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'managementSubjectName',
      initialVisibility: 'hidden',
      label: 'cadastral_unit.field.management_subject',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => row.estateUnit.managementSubject.name,
    },
    {
      id: 'coordinates',
      initialVisibility: 'hidden',
      label: 'cadastral_unit.field.cadastral_coordinates',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      getRowValue: (row) => parseCadastralCoordinatesToString(row.coordinates),
    },
    ...(useStatus
      ? [
          {
            id: 'status',
            label: 'cadastral_unit.field.cadastral_unit_status',
            multiple: true,
            options: Object.values(CadastralUnitStatus),
            enableColumnFilter: true,
            getOptionLabel: (option) => t(`common.enum.cadastral_unit_status.${option as CadastralUnitStatus}`),
          } as TableColumn<CadastralUnitFragment>,
        ]
      : []),
  ];
};
