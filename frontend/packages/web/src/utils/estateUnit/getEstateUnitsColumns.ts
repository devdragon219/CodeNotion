import { EstateType, EstateUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitFormInput } from '../../interfaces/FormInputs/EstateUnit';
import { parseCadastralCoordinatesToString } from '../cadastralUnit/parseCadastralCoordinatesToString';
import { getCountryName, getSortedCountryCodes } from '../countryUtils';
import { isEstateUnitFragment } from '../typeNarrowings/isEstateUnitFragment';

export const getEstateUnitsColumns = <T extends EstateUnitFragment | EstateUnitFormInput = EstateUnitFragment>(
  language: string,
  t: TFunction,
  options?: {
    useStatus?: boolean;
    useFilter?: boolean;
  },
): TableColumn<T>[] => {
  const useFilter = options?.useFilter ?? true;
  const useStatus = options?.useStatus ?? true;

  return [
    {
      id: 'internalCode',
      label: 'estate_unit.field.estate_unit_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'type',
      label: 'estate_unit.field.estate_unit_type',
      multiple: true,
      options: Object.values(EstateUnitType),
      enableColumnFilter: useFilter,
      getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
      getRowValue: (row) => (isEstateUnitFragment(row) ? row.type : row.estateUnitType),
    },
    ...((useStatus
      ? [
          {
            id: 'status',
            label: 'estate_unit.field.estate_unit_status',
            multiple: true,
            options: Object.values(EstateUnitStatus),
            enableColumnFilter: useFilter,
            getOptionLabel: (option) => t(`common.enum.estate_unit_status.${option as EstateUnitStatus}`),
          },
        ]
      : []) as TableColumn<T>[]),
    {
      id: 'managementSubjectName',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.management_subject',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.estate?.managementSubject.name,
    },
    {
      id: 'address.toponymy',
      label: 'estate_unit.field.address_toponymy',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => [row.address?.toponymy, row.address?.numbering].join(', '),
    },
    {
      id: 'address.cityName',
      label: 'estate_unit.field.address_city',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.address?.city?.name,
    },
    {
      id: 'address.localPostCode',
      label: 'estate_unit.field.address_postal_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'address.countryISO',
      label: 'estate_unit.field.address_country',
      multiple: true,
      options: getSortedCountryCodes(language),
      enableColumnFilter: useFilter,
      getOptionLabel: (countryCode) => getCountryName(countryCode as string, language),
    },
    {
      id: 'address.countyName',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.address_county',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'subNumbering',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.address_indoor_number',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'stair.description',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.stair',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'externalCode',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.external_estate_unit_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'name',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.estate_unit_name',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'netSurface',
      type: 'number',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.net_surface',
      enableColumnFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'grossSurface',
      type: 'number',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.gross_surface',
      enableColumnFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'floors',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.floors_counter',
      getRowValue: (row) => row.floors.length,
    },
    {
      id: 'estate.internalCode',
      label: 'estate_unit.field.estate_code',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'estate.name',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.estate_name',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
    },
    {
      id: 'estate.type',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.estate_type',
      multiple: true,
      options: Object.values(EstateType),
      enableColumnFilter: useFilter,
      getOptionLabel: (option) => t(`common.enum.estate_type.${option as EstateType}`),
      getRowValue: (row) => row.estate?.type,
    },
    {
      id: 'cadastralUnit.coordinates',
      initialVisibility: 'hidden',
      label: 'estate_unit.field.cadastral_coordinates',
      getRowValue: (row) =>
        parseCadastralCoordinatesToString(
          (isEstateUnitFragment(row) ? row.currentCadastralUnit : row.cadastralUnit)?.coordinates,
        ),
    },
    {
      id: 'usageType',
      label: 'estate_unit.field.usage_type',
      enableColumnFilter: useFilter,
      enableGlobalFilter: useFilter,
      enableSorting: true,
      getRowValue: (row) => row.usageType?.name,
    },
  ];
};
