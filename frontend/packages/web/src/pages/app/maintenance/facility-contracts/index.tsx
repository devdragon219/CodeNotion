import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FacilityContractCreateDialog } from '../../../../components/wizards/FacilityContract/FacilityContract';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteFacilityContractsDocument,
  ExportFacilityContractsDocument,
  GetFacilityContractsQueryVariables,
  useCreateFacilityContractMutation,
  useGetFacilityContractsQuery,
} from '../../../../gql/RealGimm.Web.FacilityContract.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractsColumns } from '../../../../utils/facilityContract/getFacilityContractsColumns';
import { parseFacilityContractFormInputToFacilityContractInput } from '../../../../utils/facilityContract/parseFacilityContractFormInput';

export default function FacilityContracts() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
  } = useTable<GetFacilityContractsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetFacilityContractsQuery({ pause, variables });
  const [, createFacilityContractMutation] = useCreateFacilityContractMutation();
  const [loading, setLoading] = useState(false);
  const [isFacilityContractCreateDialogOpen, setFacilityContractCreateDialogOpen] = useState(false);
  const facilityContracts = useMemo(() => queryState.data?.fcltContract.listFcltContracts, [queryState.data]);

  const handleOpenFacilityContractCreateDialog = useCallback(() => {
    setFacilityContractCreateDialogOpen(true);
  }, []);

  const handleCloseFacilityContractCreateDialog = useCallback(() => {
    setFacilityContractCreateDialogOpen(false);
  }, []);
  const handleSaveCreateWorkTeam = useCallback(
    async (facilityContract: FacilityContractFormInput) => {
      setLoading(true);
      const result = await createFacilityContractMutation({
        input: parseFacilityContractFormInputToFacilityContractInput(facilityContract, FormMode.Create),
      });
      setLoading(false);
      if (result.data?.fcltContract.add.isSuccess) {
        showSnackbar(t('facility_contract.feedback.create'), 'success');
        handleCloseFacilityContractCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.fcltContract.add.validationErrors);
      }
    },
    [
      createFacilityContractMutation,
      showSnackbar,
      t,
      handleCloseFacilityContractCreateDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('facility_contract.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getFacilityContractsColumns(t)}
          empty="facility_contract.text.no_facility_contracts"
          initialState={initialState}
          rows={facilityContracts?.nodes ?? []}
          totalCount={facilityContracts?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenFacilityContractCreateDialog : undefined}
          onDelete={
            canDelete ? handleDelete('facility_contract', DeleteFacilityContractsDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/maintenance/facility-contracts/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportFacilityContractsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(facilityContracts?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/maintenance/facility-contracts/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isFacilityContractCreateDialogOpen && (
        <FacilityContractCreateDialog
          onClose={handleCloseFacilityContractCreateDialog}
          onSave={handleSaveCreateWorkTeam}
        />
      )}
    </Card>
  );
}
