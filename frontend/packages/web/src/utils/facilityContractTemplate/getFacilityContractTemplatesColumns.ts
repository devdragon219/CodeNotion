import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { FacilityContractTemplateFragment } from '../../gql/RealGimm.Web.FacilityContractTemplate.fragment';

export const getFacilityContractTemplatesColumns = (
  showAll: (row: FacilityContractTemplateFragment) => ReactElement,
): TableColumn<FacilityContractTemplateFragment>[] => [
  {
    id: 'internalCode',
    label: 'facility_contract_template.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'facility_contract_template.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'contractType.name',
    label: 'facility_contract_template.field.contract_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'catalogueTypes',
    label: 'facility_contract_template.field.catalogue_types',
    getRowValue: (row) => {
      if (row.catalogueTypes.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
];
