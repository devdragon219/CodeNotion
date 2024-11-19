import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ContractTypeCreateDialog } from '../../../../../components/wizards/ContractType/ContractType';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteContractTypesDocument,
  ExportContractTypesDocument,
  GetContractTypesQueryVariables,
  useCreateContractTypeMutation,
  useGetContractTypesQuery,
} from '../../../../../gql/RealGimm.Web.ContractType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { ContractTypeFormInput } from '../../../../../interfaces/FormInputs/ContractType';
import { getContractTypesColumns } from '../../../../../utils/contractType/getContractTypesColumns';
import { getContractTypesFilterInput } from '../../../../../utils/contractType/getContractTypesFilterInput';
import { parseContractTypeFormInputToContractTypeInput } from '../../../../../utils/contractType/parseContractTypeFormInput';

export default function ContractTypes() {
  const { canCreate, canRead, canUpdate, canDelete } = useFeature(RawFeature.PROP_CONTRACT_TYPES);
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
  } = useTable<GetContractTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetContractTypesQuery({ pause, variables });
  const [, createContractTypeMutation] = useCreateContractTypeMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateContractTypeDialogProps, setIsCreateContractTypeDialogProps] = useState(false);
  const contractTypes = useMemo(() => queryState.data?.contractType.listContractTypes, [queryState.data]);

  const handleCloseContractTypeDialog = useCallback(() => {
    setIsCreateContractTypeDialogProps(false);
  }, []);

  const handleSaveContractType = useCallback(
    async (value: ContractTypeFormInput) => {
      setLoading(true);
      const result = await createContractTypeMutation({
        contractTypeInput: parseContractTypeFormInputToContractTypeInput(value),
      });
      setLoading(false);
      if (result.data?.contractType.add.isSuccess) {
        showSnackbar(t('contract_type.feedback.create'), 'success');
        handleCloseContractTypeDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.contractType.add.validationErrors);
      }
    },
    [createContractTypeMutation, handleCloseContractTypeDialog, reexecuteQuery, showError, showSnackbar, t],
  );

  const handleAddContractType = useCallback(() => {
    setIsCreateContractTypeDialogProps(true);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('contract_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getContractTypesColumns(t)}
          empty="contract_type.text.no_contract_types"
          initialState={initialState}
          rows={contractTypes?.nodes ?? []}
          totalCount={contractTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddContractType : undefined}
          onDelete={canDelete ? handleDelete('contract_type', DeleteContractTypesDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/asset-management/contract-types/${row.id}`);
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportContractTypesDocument) : undefined}
          onFilter={handleFilter(getContractTypesFilterInput)}
          onPageChange={handlePageChange(contractTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/asset-management/contract-types/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility
        />
      </CardContent>
      {isCreateContractTypeDialogProps && (
        <ContractTypeCreateDialog onSave={handleSaveContractType} onClose={handleCloseContractTypeDialog} />
      )}
    </Card>
  );
}
