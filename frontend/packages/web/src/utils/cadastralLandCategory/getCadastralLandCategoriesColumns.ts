import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { CadastralLandCategoryFragment } from '../../gql/RealGimm.Web.CadastralLandCategory.fragment';
import { getCountryName, getSortedCountryCodes } from '../countryUtils';

export const getCadastralLandCategoriesColumns = (language: string): TableColumn<CadastralLandCategoryFragment>[] => [
  {
    id: 'ordering',
    label: 'cadastral_land_category.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'cadastral_land_category.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'cadastral_land_category.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'countryISO',
    label: 'cadastral_land_category.field.country_iso',
    enableColumnFilter: true,
    options: getSortedCountryCodes(language),
    multiple: true,
    getOptionLabel: (countryCode) => getCountryName(countryCode as string, language),
  },
];
