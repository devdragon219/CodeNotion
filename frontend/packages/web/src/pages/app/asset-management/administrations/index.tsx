import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AdministrationCreateDialog } from '../../../../components/wizards/Administration/Administration';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteAdministrationsDocument,
  ExportAdministrationsDocument,
  GetAdministrationsQueryVariables,
  useCreateAdministrationMutation,
  useGetAdministrationsQuery,
} from '../../../../gql/RealGimm.Web.Administration.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';
import { getAdministrationsColumns } from '../../../../utils/administration/getAdministrationsColumns';
import { parseAdministrationFormInputToAdministrationInput } from '../../../../utils/administration/parseAdministrationFormInput';

export default function Administrations() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.PROP_BILL_BASE);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const { showError, showSnackbar } = useSnackbar();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetAdministrationsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetAdministrationsQuery({ pause, variables });
  const [, createAdministrationMutation] = useCreateAdministrationMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateAdministrationDialogProps, setIsCreateAdministrationDialogProps] = useState(false);
  const administrations = useMemo(() => queryState.data?.administration.listAdministrations, [queryState.data]);

  const handleCloseAdministrationDialog = useCallback(() => {
    setIsCreateAdministrationDialogProps(false);
  }, []);

  const handleSaveAdministration = useCallback(
    async (value: AdministrationsFormInput) => {
      setLoading(true);
      const estateId = Number(value.estate?.id);
      const result = await createAdministrationMutation({
        estateId: estateId,
        inputs: value.administrations.map((administration) =>
          parseAdministrationFormInputToAdministrationInput(estateId, administration),
        ),
      });
      setLoading(false);
      if (result.data?.administration.add.isSuccess) {
        showSnackbar(t('administration.feedback.create'), 'success');
        handleCloseAdministrationDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.administration.add.validationErrors);
      }
    },
    [t, createAdministrationMutation, handleCloseAdministrationDialog, showError, showSnackbar, reexecuteQuery],
  );

  const handleAddAdministration = useCallback(() => {
    setIsCreateAdministrationDialogProps(true);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('administration.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getAdministrationsColumns(t, language)}
          empty="administration.text.no_administrations"
          initialState={initialState}
          rows={administrations?.nodes ?? []}
          totalCount={administrations?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddAdministration : undefined}
          onDelete={
            canDelete ? handleDelete('administration', DeleteAdministrationsDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/asset-management/administrations/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportAdministrationsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(administrations?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/asset-management/administrations/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateAdministrationDialogProps && (
        <AdministrationCreateDialog onSave={handleSaveAdministration} onClose={handleCloseAdministrationDialog} />
      )}
    </Card>
  );
}
