import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { RegistryCommunicationGroupIdFilterInput } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import { useCancelConfirmedRegistryCommunicationGroupsMutation } from '../../../gql/RealGimm.Web.ConfirmedRegistryCommunication.operation';
import {
  ExportRegistryCommunicationGroupsDocument,
  GetRegistryCommunicationGroupsQueryVariables,
  useGetRegistryCommunicationGroupsQuery,
} from '../../../gql/RealGimm.Web.RegistryCommunication.operation';
import { RegistryCommunicationGroupFragment } from '../../../gql/RealGimm.Web.RegistryCommunicationGroup.fragment';
import {
  useConfirmAllTemporaryRegistryCommunicationGroupsMutation,
  useConfirmTemporaryRegistryCommunicationGroupsMutation,
} from '../../../gql/RealGimm.Web.TemporaryRegistryCommunication.operation';
import { useFeature } from '../../../hooks/useFeature';
import { ConfirmTemporaryRegistryCommunicationGroupFormInput } from '../../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';
import { getRegistryCommunicationGroupsColumns } from '../../../utils/registryCommunication/getRegistryCommunicationGroupsColumns';
import { parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput } from '../../../utils/registryCommunication/parseConfirmTemporaryRegistryCommunicationGroupFormInput';
import { parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput } from '../../../utils/registryCommunication/parseRegistryCommunicationGroupIdFragment';
import { ConfirmTemporaryRegistryCommunicationGroupsDialog } from '../../dialogs/ConfirmTemporaryRegistryCommunicationGroups/ConfirmTemporaryRegistryCommunicationGroups';
import { RegistryCommunicationGroupsActions } from '../../domains/RegistryCommunicationGroupsActions/RegistryCommunicationGroupsActions';
import { RegistryCommunicationGroupsTableProps } from './RegistryCommunicationGroups.types';

export const RegistryCommunicationGroupsTable = ({ isConfirmed }: RegistryCommunicationGroupsTableProps) => {
  const { canRead, canUpdate } = useFeature(RawFeature.PROP_REGISTRY_COMMUNICATION);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { initialState, pause, variables, handleExport, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetRegistryCommunicationGroupsQueryVariables>((variables) => ({
      ...variables,
      isConfirmed,
    }));
  const [queryState, reexecuteQuery] = useGetRegistryCommunicationGroupsQuery({ pause, variables });
  const registryCommunicationGroups = useMemo(
    () => queryState.data?.registryCommunication.listRegistryCommunicationGroups,
    [queryState.data],
  );
  const [loading, setLoading] = useState(false);
  const [, confirmAllTemporaryRegistryCommunicationGroupsMutation] =
    useConfirmAllTemporaryRegistryCommunicationGroupsMutation();
  const [, confirmTemporaryRegistryCommunicationGroupsMutation] =
    useConfirmTemporaryRegistryCommunicationGroupsMutation();
  const [, cancelConfirmedRegistryCommunicationGroupsMutation] =
    useCancelConfirmedRegistryCommunicationGroupsMutation();
  const [
    confirmTemporaryRegistryCommunicationGroupDialogProps,
    setConfirmTemporaryRegistryCommunicationGroupDialogProps,
  ] = useState<{
    open: boolean;
    registryCommunicationGroups?: RegistryCommunicationGroupFragment[];
  }>({
    open: false,
  });

  const handleNavigate = useCallback(
    (readonly: boolean) => (row: RegistryCommunicationGroupFragment) => {
      const paths = [
        row.id.managementSubjectId,
        row.id.isActiveContract,
        row.id.communicationType,
        row.id.endDate,
        row.id.date,
        row.id.requestingSubjectLegalRepresentativeId,
        row.id.debtBankAccountId,
      ]
        .filter((it) => it !== null && it !== undefined)
        .join('/');
      navigate(`/app/asset-management/registry-communications/${isConfirmed ? 'confirmed' : 'temporary'}/${paths}`, {
        state: { readonly },
      });
    },
    [isConfirmed, navigate],
  );

  const handleConfirmTemporaryRegistryCommunicationGroups = useCallback(
    (rows?: RegistryCommunicationGroupFragment | RegistryCommunicationGroupFragment[]) => {
      setConfirmTemporaryRegistryCommunicationGroupDialogProps({
        open: true,
        registryCommunicationGroups: rows && !Array.isArray(rows) ? [rows] : rows,
      });
    },
    [],
  );

  const handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog = useCallback(() => {
    setConfirmTemporaryRegistryCommunicationGroupDialogProps({
      open: false,
    });
  }, []);
  const handleSaveConfirmTemporaryRegistryCommunicationGroups = useCallback(
    async (
      inputs: ConfirmTemporaryRegistryCommunicationGroupFormInput[],
      rows?: RegistryCommunicationGroupFragment[],
    ) => {
      const execute = async () => {
        if (rows) {
          const result = await confirmTemporaryRegistryCommunicationGroupsMutation({
            groupIds: rows.map(({ id }) => id),
            inputs:
              parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput(
                inputs,
              ),
          });
          return result.data?.temporaryRegistryCommunication.confirmRange;
        } else {
          const result = await confirmAllTemporaryRegistryCommunicationGroupsMutation({
            inputs:
              parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput(
                inputs,
              ),
          });
          return result.data?.temporaryRegistryCommunication.confirmAll;
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`registry_communication.feedback.confirm.${rows?.length === 1 ? 'single' : 'multiple'}`), {
          severity: 'success',
        });
        handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      confirmAllTemporaryRegistryCommunicationGroupsMutation,
      confirmTemporaryRegistryCommunicationGroupsMutation,
      handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      t,
    ],
  );

  const handleCancelConfirmedRegistryCommunicationGroups = useCallback(
    async (rows: RegistryCommunicationGroupFragment | RegistryCommunicationGroupFragment[]) => {
      setLoading(true);
      const result = await cancelConfirmedRegistryCommunicationGroupsMutation({
        groupIds: (Array.isArray(rows) ? rows : [rows]).map(({ id }) =>
          parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput(id),
        ),
      });
      setLoading(false);
      if (result.data?.confirmedRegistryCommunication.cancelRangeConfirmation.isSuccess) {
        showSnackbar(
          t(`registry_communication.feedback.cancel.${Array.isArray(rows) && rows.length > 1 ? 'multiple' : 'single'}`),
          { severity: 'success' },
        );
        reexecuteQuery();
      } else {
        showError(result.data?.confirmedRegistryCommunication.cancelRangeConfirmation.validationErrors);
      }
    },
    [cancelConfirmedRegistryCommunicationGroupsMutation, reexecuteQuery, showError, showSnackbar, t],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        columns={getRegistryCommunicationGroupsColumns(isConfirmed, t)}
        customRowActions={
          isConfirmed
            ? [
                {
                  context: 'row',
                  icon: CancelOutlined,
                  id: 'cancel_row',
                  label: 'registry_communication.action.cancel_single',
                  onClick: handleCancelConfirmedRegistryCommunicationGroups,
                },
                {
                  context: 'rows',
                  icon: CancelOutlined,
                  id: 'cancel_rows',
                  label: 'registry_communication.action.cancel_multiple',
                  onClick: handleCancelConfirmedRegistryCommunicationGroups,
                },
              ]
            : [
                {
                  context: 'row',
                  icon: CheckCircleOutline,
                  id: 'confirm_row',
                  label: 'registry_communication.action.confirm_single',
                  onClick: handleConfirmTemporaryRegistryCommunicationGroups,
                },
                {
                  context: 'rows',
                  icon: CheckCircleOutline,
                  id: 'confirm_rows',
                  label: 'registry_communication.action.confirm_multiple',
                  onClick: handleConfirmTemporaryRegistryCommunicationGroups,
                },
              ]
        }
        customTableActions={
          !isConfirmed && (
            <RegistryCommunicationGroupsActions onConfirm={handleConfirmTemporaryRegistryCommunicationGroups} />
          )
        }
        empty="registry_communication.text.no_registry_communications"
        initialState={initialState}
        rows={registryCommunicationGroups?.nodes ?? []}
        totalCount={registryCommunicationGroups?.totalCount ?? 0}
        getRowId={({ id }) =>
          [
            id.communicationType,
            id.date,
            id.debtBankAccountId,
            id.endDate,
            id.isActiveContract,
            id.managementSubjectId,
            id.requestingSubjectLegalRepresentativeId,
          ]
            .filter((it) => !!it)
            .join('_')
        }
        onEdit={canUpdate ? handleNavigate(false) : undefined}
        onExport={
          canRead
            ? handleExport(
                (row) => ({
                  id: Object.keys(row.id)
                    .filter(
                      (it) =>
                        it !== '__typename' &&
                        row.id[it as keyof typeof row.id] !== null &&
                        row.id[it as keyof typeof row.id] !== undefined,
                    )
                    .reduce<RegistryCommunicationGroupIdFilterInput>(
                      (acc, key) => ({
                        ...acc,
                        [key]: {
                          eq: row.id[key as keyof typeof row.id],
                        },
                      }),
                      {},
                    ),
                }),
                ExportRegistryCommunicationGroupsDocument,
              )
            : undefined
        }
        onFilter={handleFilter()}
        onPageChange={handlePageChange(registryCommunicationGroups?.pageInfo)}
        onSort={handleSort()}
        onStateChange={setInitialState}
        onView={canRead ? handleNavigate(true) : undefined}
        useColumnVisibility={false}
      />
      {confirmTemporaryRegistryCommunicationGroupDialogProps.open && (
        <ConfirmTemporaryRegistryCommunicationGroupsDialog
          registryCommunicationGroups={
            confirmTemporaryRegistryCommunicationGroupDialogProps.registryCommunicationGroups
          }
          onClose={handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog}
          onSave={handleSaveConfirmTemporaryRegistryCommunicationGroups}
        />
      )}
    </>
  );
};
