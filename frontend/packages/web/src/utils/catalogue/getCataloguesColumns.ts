import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { CatalogueFragment } from '../../gql/RealGimm.Web.CatalogueOutput.fragment';

export const getCataloguesColumns = (
  useEstate: boolean,
  showAll: (row: CatalogueFragment) => ReactElement,
): TableColumn<CatalogueFragment>[] => [
  ...((useEstate
    ? [
        {
          id: 'estateInternalCode',
          label: 'catalogue.field.estate_code',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
        },
      ]
    : []) as TableColumn<CatalogueFragment>[]),
  {
    id: 'catalogueCategory',
    label: 'catalogue.field.catalogue_category',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'catalogueSubCategory',
    label: 'catalogue.field.catalogue_subcategory',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'catalogueType',
    label: 'catalogue.field.catalogue_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'catalogueTypeCount',
    label: 'catalogue.field.catalogue_type_count',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => {
      if (row.catalogueTypeCount === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
];
