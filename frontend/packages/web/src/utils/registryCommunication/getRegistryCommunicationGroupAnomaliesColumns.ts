import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { RegistryCommunicationGroupAnomalyFragment } from '../../gql/RealGimm.Web.RegistryCommunicationAnomalyOutput.fragment';

export const getRegistryCommunicationGroupAnomaliesColumns =
  (): TableColumn<RegistryCommunicationGroupAnomalyFragment>[] => [
    {
      id: 'contractInternalCode',
      label: 'registry_communication.field.contract_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'description',
      label: 'registry_communication.field.anomaly',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
  ];
