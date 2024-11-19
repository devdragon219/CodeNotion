import { Grid2, Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistryCommunicationFragment } from '../../../../gql/RealGimm.Web.RegistryCommunication.fragment';
import {
  DeleteRegistryCommunicationsDocument,
  GetRegistryCommunicationsQueryVariables,
  useGetRegistryCommunicationsQuery,
  useMarkRegistryCommunicationAsExcludedMutation,
  useMarkRegistryCommunicationAsIncludedMutation,
} from '../../../../gql/RealGimm.Web.RegistryCommunication.operation';
import { getRegistryCommunicationsColumns } from '../../../../utils/registryCommunication/getRegistryCommunicationsColumns';
import { RegistryCommunicationEstateUnitsDialog } from './Dialog/Dialog';
import { RegistryCommunicationGroupItemsProps } from './Items.types';

export const RegistryCommunicationGroupItems = ({
  groupId,
  isConfirmed,
  readonly,
}: RegistryCommunicationGroupItemsProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetRegistryCommunicationsQueryVariables>((variables) => ({
      ...variables,
      groupId,
    }));
  const [queryState, reexecuteQuery] = useGetRegistryCommunicationsQuery({ pause, variables });
  const registryCommunications = useMemo(
    () => queryState.data?.registryCommunication.listRegistryCommunications,
    [queryState.data],
  );
  const [registryCommunicationEstateUnitsDialogProps, setRegistryCommunicationEstateUnitsDialogProps] =
    useState<RegistryCommunicationFragment | null>(null);
  const [, markRegistryCommunicationAsExcludedMutation] = useMarkRegistryCommunicationAsExcludedMutation();
  const [, markRegistryCommunicationAsIncludedMutation] = useMarkRegistryCommunicationAsIncludedMutation();
  const [loading, setLoading] = useState(false);

  const showAllButton = useCallback(
    (row: RegistryCommunicationFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setRegistryCommunicationEstateUnitsDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseContractLocatedUnitsDialog = useCallback(() => {
    setRegistryCommunicationEstateUnitsDialogProps(null);
  }, []);

  const handleExcludeRegistryCommunication = useCallback(
    async ({ id }: RegistryCommunicationFragment) => {
      setLoading(true);
      const result = await markRegistryCommunicationAsExcludedMutation({
        id,
      });
      setLoading(false);
      if (result.data?.registryCommunication.markAsExcluded.isSuccess) {
        showSnackbar(t('registry_communication.feedback.exclude'), { severity: 'success' });
        reexecuteQuery();
      } else {
        showError(result.data?.registryCommunication.markAsExcluded.validationErrors);
      }
    },
    [markRegistryCommunicationAsExcludedMutation, reexecuteQuery, showError, showSnackbar, t],
  );
  const handleIncludeRegistryCommunication = useCallback(
    async ({ id }: RegistryCommunicationFragment) => {
      setLoading(true);
      const result = await markRegistryCommunicationAsIncludedMutation({
        id,
      });
      setLoading(false);
      if (result.data?.registryCommunication.markAsIncluded.isSuccess) {
        showSnackbar(t('registry_communication.feedback.include'), { severity: 'success' });
        reexecuteQuery();
      } else {
        showError(result.data?.registryCommunication.markAsIncluded.validationErrors);
      }
    },
    [markRegistryCommunicationAsIncludedMutation, reexecuteQuery, showError, showSnackbar, t],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(queryState.fetching || loading) && <Loader />}
      <SectionTitle value="registry_communication.section_title.contracts" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getRegistryCommunicationsColumns(isConfirmed, showAllButton)}
          customRowActions={
            isConfirmed
              ? []
              : [
                  {
                    context: 'row',
                    id: 'include',
                    label: 'registry_communication.action.include',
                    onClick: handleIncludeRegistryCommunication,
                  },
                  {
                    context: 'row',
                    id: 'exclude',
                    label: 'registry_communication.action.exclude',
                    onClick: handleExcludeRegistryCommunication,
                  },
                ]
          }
          hideRowActions={(row) => (row.isExcluded ? 'exclude' : 'include')}
          rowActionsVariant="inline"
          empty="registry_communication.text.no_contracts"
          initialState={initialState}
          rows={registryCommunications?.nodes ?? []}
          totalCount={registryCommunications?.totalCount ?? 0}
          useRowActions={!readonly}
          getRowId={({ id }) => String(id)}
          onDelete={
            isConfirmed
              ? handleDelete('registry_communication', DeleteRegistryCommunicationsDocument, reexecuteQuery)
              : undefined
          }
          onFilter={handleFilter()}
          onPageChange={handlePageChange(registryCommunications?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          useColumnVisibility={false}
          useRowSelection={false}
        />
      </Grid2>
      {registryCommunicationEstateUnitsDialogProps && (
        <RegistryCommunicationEstateUnitsDialog
          registryCommunication={registryCommunicationEstateUnitsDialogProps}
          onClose={handleCloseContractLocatedUnitsDialog}
        />
      )}
    </Grid2>
  );
};
