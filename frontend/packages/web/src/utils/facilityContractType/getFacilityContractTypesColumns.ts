import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { FacilityContractTypeFragment } from '../../gql/RealGimm.Web.FacilityContractType.fragment';

export const getFacilityContractTypesColumns = (): TableColumn<FacilityContractTypeFragment>[] => [
  {
    id: 'ordering',
    label: 'facility_contract_type.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'facility_contract_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'facility_contract_type.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
