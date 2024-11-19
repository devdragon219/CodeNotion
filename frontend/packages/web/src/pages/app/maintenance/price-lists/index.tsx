import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PriceListCreateDialog } from '../../../../components/dialogs/PriceList/PriceList';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeletePriceListsDocument,
  ExportPriceListsDocument,
  GetPriceListsQueryVariables,
  useAddPriceListMutation,
  useGetPriceListsQuery,
} from '../../../../gql/RealGimm.Web.PriceList.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { PriceListFormInput } from '../../../../interfaces/FormInputs/PriceList';
import { getPriceListsColumns } from '../../../../utils/priceList/getPriceListsColumns';
import { getPriceListsSortInput } from '../../../../utils/priceList/getPriceListsSortInput';
import { parsePriceListFormInputToPriceListInput } from '../../../../utils/priceList/parsePriceListFormInput';

export default function PriceLists() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_PRICE_LIST_BASE);
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
  } = useTable<GetPriceListsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetPriceListsQuery({ pause, variables });
  const [, createPriceListMutation] = useAddPriceListMutation();
  const [loading, setLoading] = useState(false);
  const [isPriceListCreateDialogOpen, setPriceListCreateDialogOpen] = useState(false);
  const priceLists = useMemo(() => queryState.data?.priceList.listPriceLists, [queryState.data]);

  const handleOpenPriceListCreateDialog = useCallback(() => {
    setPriceListCreateDialogOpen(true);
  }, []);

  const handleClosePriceListCreateDialog = useCallback(() => {
    setPriceListCreateDialogOpen(false);
  }, []);
  const handleSaveCreatePriceList = useCallback(
    async (priceList: PriceListFormInput) => {
      setLoading(true);
      const result = await createPriceListMutation({
        input: parsePriceListFormInputToPriceListInput(priceList),
      });
      setLoading(false);
      if (result.data?.priceList.add.isSuccess) {
        showSnackbar(t('price_list.feedback.create'), 'success');
        handleClosePriceListCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.priceList.add.validationErrors);
      }
    },
    [createPriceListMutation, showSnackbar, t, handleClosePriceListCreateDialog, reexecuteQuery, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('price_list.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getPriceListsColumns()}
          empty="price_list.text.no_price_lists"
          initialState={initialState}
          rows={priceLists?.nodes ?? []}
          totalCount={priceLists?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenPriceListCreateDialog : undefined}
          onDelete={canDelete ? handleDelete('price_list', DeletePriceListsDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/maintenance/price-lists/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportPriceListsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(priceLists?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getPriceListsSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/maintenance/price-lists/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isPriceListCreateDialogOpen && (
        <PriceListCreateDialog onClose={handleClosePriceListCreateDialog} onSave={handleSaveCreatePriceList} />
      )}
    </Card>
  );
}
