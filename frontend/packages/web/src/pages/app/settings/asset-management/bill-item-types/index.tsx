import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BillItemTypeCreateDialog } from '../../../../../components/wizards/BillItemType/BillItemType';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteBillItemTypesDocument,
  ExportBillItemTypesDocument,
  GetBillItemTypesQueryVariables,
  useCreateBillItemTypeMutation,
  useGetBillItemTypesQuery,
} from '../../../../../gql/RealGimm.Web.BillItemType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { BillItemTypeFormInput } from '../../../../../interfaces/FormInputs/BillItemType';
import { getBillItemTypesColumns } from '../../../../../utils/billItemType/getBillItemTypesColumns';
import { getBillItemTypesFilterInput } from '../../../../../utils/billItemType/getBillItemTypesFilterInput';
import { parseBillItemTypeFormInputToBillItemTypeInput } from '../../../../../utils/billItemType/parseBillItemTypeFormInput';

export default function BillItemTypes() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.COMMON_BILLITEMTYPES);
  const { t } = useTranslation();
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
  } = useTable<GetBillItemTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetBillItemTypesQuery({ pause, variables });
  const [, createBillItemTypeMutation] = useCreateBillItemTypeMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateBillItemTypeDialogProps, setIsCreateBillItemTypeDialogProps] = useState(false);
  const billItemTypes = useMemo(() => queryState.data?.billItemType.listBillItemTypes, [queryState.data]);

  const handleCloseBillItemTypeDialog = useCallback(() => {
    setIsCreateBillItemTypeDialogProps(false);
  }, []);

  const handleSaveBillItemType = useCallback(
    async (value: BillItemTypeFormInput) => {
      setLoading(true);
      const result = await createBillItemTypeMutation({
        input: parseBillItemTypeFormInputToBillItemTypeInput(value),
      });
      setLoading(false);
      if (result.data?.billItemType.add.isSuccess) {
        showSnackbar(t('bill_item_type.feedback.create'), 'success');
        handleCloseBillItemTypeDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.billItemType.add.validationErrors);
      }
    },
    [t, createBillItemTypeMutation, handleCloseBillItemTypeDialog, showError, showSnackbar, reexecuteQuery],
  );

  const handleAddBillItemType = useCallback(() => {
    setIsCreateBillItemTypeDialogProps(true);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('bill_item_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getBillItemTypesColumns(t)}
          empty="bill_item_type.text.no_bill_item_types"
          initialState={initialState}
          rows={billItemTypes?.nodes ?? []}
          totalCount={billItemTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddBillItemType : undefined}
          onDelete={canDelete ? handleDelete('bill_item_type', DeleteBillItemTypesDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/asset-management/bill-item-types/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportBillItemTypesDocument) : undefined}
          onFilter={handleFilter(getBillItemTypesFilterInput)}
          onPageChange={handlePageChange(billItemTypes?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/asset-management/bill-item-types/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility
        />
      </CardContent>
      {isCreateBillItemTypeDialogProps && (
        <BillItemTypeCreateDialog onSave={handleSaveBillItemType} onClose={handleCloseBillItemTypeDialog} />
      )}
    </Card>
  );
}
