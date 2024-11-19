import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountingItemDialog } from '../../../../../components/dialogs/AccountingItem/AccountingItem';
import { RawFeature } from '../../../../../enums/RawFeature';
import { AccountingItemFragment } from '../../../../../gql/RealGimm.Web.AccountingItem.fragment';
import {
  DeleteAccountingItemsDocument,
  ExportAccountingItemsDocument,
  GetAccountingItemsQueryVariables,
  useAddAccountingItemMutation,
  useGetAccountingItemsQuery,
  useUpdateAccountingItemMutation,
} from '../../../../../gql/RealGimm.Web.AccountingItem.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { AccountingItemFormInput } from '../../../../../interfaces/FormInputs/AccountingItem';
import { getAccountingItemsColumns } from '../../../../../utils/accountingItem/getAccountingItemsColumns';
import { parseAccountingItemFormInputToAccountingItemInput } from '../../../../../utils/accountingItem/parseAccountingItemFormInput';
import { parseAccountingItemToAccountingItemFormInput } from '../../../../../utils/accountingItem/parseAccountingItemFragment';

export default function AccountingItems() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.COMMON_ACCOUNTINGITEMS);
  const { t } = useTranslation();
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
  } = useTable<GetAccountingItemsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetAccountingItemsQuery({ pause, variables });
  const [, createAccountingItemMutation] = useAddAccountingItemMutation();
  const [, updateAccountingItemMutation] = useUpdateAccountingItemMutation();
  const [loading, setLoading] = useState(false);
  const [accountingItemsDialogProps, setAccountingItemsDialogProps] = useState<{
    input?: AccountingItemFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const accountingItems = useMemo(() => queryState.data?.accountingItem.listAccountingTypes, [queryState.data]);

  const handleCloseAccountingItemsDialog = useCallback(() => {
    setAccountingItemsDialogProps({ open: false });
  }, []);

  const handleEditAccountingItem = useCallback((row: AccountingItemFragment) => {
    setAccountingItemsDialogProps({
      input: parseAccountingItemToAccountingItemFormInput(row),
      open: true,
    });
  }, []);

  const handleViewAccountingItem = useCallback((row: AccountingItemFragment) => {
    setAccountingItemsDialogProps({
      input: parseAccountingItemToAccountingItemFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveAccountingItem = useCallback(
    async (value: AccountingItemFormInput) => {
      const saveAccountingItem = async () => {
        if (value.accountingItemId) {
          const result = await updateAccountingItemMutation({
            accountingItemId: value.accountingItemId,
            input: parseAccountingItemFormInputToAccountingItemInput(value),
          });
          return result.data?.accountingItem.update;
        } else {
          const result = await createAccountingItemMutation({
            input: parseAccountingItemFormInputToAccountingItemInput(value),
          });
          return result.data?.accountingItem.add;
        }
      };
      setLoading(true);
      const result = await saveAccountingItem();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`accounting_item.feedback.${value.accountingItemId ? 'update' : 'create.single'}`), 'success');
        handleCloseAccountingItemsDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateAccountingItemMutation,
      createAccountingItemMutation,
      showSnackbar,
      t,
      handleCloseAccountingItemsDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddAccountingItem = useCallback(() => {
    setAccountingItemsDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('accounting_item.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getAccountingItemsColumns()}
          empty="accounting_item.text.no_accounting_items"
          initialState={initialState}
          rows={accountingItems?.nodes ?? []}
          totalCount={accountingItems?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddAccountingItem : undefined}
          onDelete={
            canDelete ? handleDelete('accounting_item', DeleteAccountingItemsDocument, reexecuteQuery) : undefined
          }
          onEdit={canUpdate ? handleEditAccountingItem : undefined}
          onExport={canRead ? handleExport('id', ExportAccountingItemsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(accountingItems?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={canRead ? handleViewAccountingItem : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {accountingItemsDialogProps.open && (
        <AccountingItemDialog
          input={accountingItemsDialogProps.input}
          readonly={accountingItemsDialogProps.readonly}
          onClose={handleCloseAccountingItemsDialog}
          onSave={handleSaveAccountingItem}
        />
      )}
    </Card>
  );
}
