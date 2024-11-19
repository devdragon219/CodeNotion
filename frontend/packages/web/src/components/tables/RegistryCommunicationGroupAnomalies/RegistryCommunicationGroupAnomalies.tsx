import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useMemo } from 'react';

import {
  GetRegistryCommunicationGroupAnomaliesQueryVariables,
  useGetRegistryCommunicationGroupAnomaliesQuery,
} from '../../../gql/RealGimm.Web.RegistryCommunication.operation';
import { getRegistryCommunicationGroupAnomaliesColumns } from '../../../utils/registryCommunication/getRegistryCommunicationGroupAnomaliesColumns';
import { RegistryCommunicationGroupAnomaliesTableProps } from './RegistryCommunicationGroupAnomalies.types';

export const RegistryCommunicationGroupAnomaliesTable = ({
  groupId,
}: RegistryCommunicationGroupAnomaliesTableProps) => {
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetRegistryCommunicationGroupAnomaliesQueryVariables>((variables) => ({
      ...variables,
      groupId,
    }));
  const [queryState] = useGetRegistryCommunicationGroupAnomaliesQuery({ pause, variables });
  const registryCommunicationGroupAnomalies = useMemo(
    () => queryState.data?.registryCommunication.listAnomalies,
    [queryState.data],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <PrimaryTable
        color="secondary"
        columns={getRegistryCommunicationGroupAnomaliesColumns()}
        empty="registry_communication.text.no_anomalies"
        initialState={initialState}
        rows={registryCommunicationGroupAnomalies?.nodes ?? []}
        totalCount={registryCommunicationGroupAnomalies?.totalCount ?? 0}
        getRowId={({ guid }) => guid}
        onFilter={handleFilter()}
        onPageChange={handlePageChange(registryCommunicationGroupAnomalies?.pageInfo)}
        onSort={handleSort()}
        onStateChange={setInitialState}
        useColumnVisibility={false}
        useRowSelection={false}
      />
    </>
  );
};
