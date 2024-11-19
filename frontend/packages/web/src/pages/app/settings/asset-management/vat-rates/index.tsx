import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VatRateDialog } from '../../../../../components/dialogs/VatRate/VatRate';
import { RawFeature } from '../../../../../enums/RawFeature';
import { VatRateFragment } from '../../../../../gql/RealGimm.Web.VatRate.fragment';
import {
  DeleteVatRatesDocument,
  ExportVatRatesDocument,
  GetVatRatesQueryVariables,
  useAddVatRateMutation,
  useGetVatRatesQuery,
  useUpdateVatRateMutation,
} from '../../../../../gql/RealGimm.Web.VatRate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { VatRateFormInput } from '../../../../../interfaces/FormInputs/VatRate';
import { getVatRatesColumns } from '../../../../../utils/vatRate/getVatRatesColumns';
import { parseVatRateFormInputToVatRateInput } from '../../../../../utils/vatRate/parseVatRateFormInput';
import { parseVatRateToVatRateFormInput } from '../../../../../utils/vatRate/parseVatRateFragment';

export default function VatRates() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.COMMON_VATRATES);
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
  } = useTable<GetVatRatesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetVatRatesQuery({ pause, variables });
  const [, createVatRateMutation] = useAddVatRateMutation();
  const [, updateVatRateMutation] = useUpdateVatRateMutation();
  const [loading, setLoading] = useState(false);
  const [vatRatesDialogProps, setVatRatesDialogProps] = useState<{
    input?: VatRateFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const vatRates = useMemo(() => queryState.data?.vatRate.listVATRates, [queryState.data]);

  const handleCloseVatRatesDialog = useCallback(() => {
    setVatRatesDialogProps({ open: false });
  }, []);

  const handleEditVatRate = useCallback((row: VatRateFragment) => {
    setVatRatesDialogProps({
      input: parseVatRateToVatRateFormInput(row),
      open: true,
    });
  }, []);

  const handleViewVatRate = useCallback((row: VatRateFragment) => {
    setVatRatesDialogProps({
      input: parseVatRateToVatRateFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveVatRate = useCallback(
    async (value: VatRateFormInput) => {
      const saveVatRate = async () => {
        if (value.vatRateId) {
          const result = await updateVatRateMutation({
            vatRateId: value.vatRateId,
            input: parseVatRateFormInputToVatRateInput(value),
          });
          return result.data?.vatRate.update;
        } else {
          const result = await createVatRateMutation({
            input: parseVatRateFormInputToVatRateInput(value),
          });
          return result.data?.vatRate.add;
        }
      };
      setLoading(true);
      const result = await saveVatRate();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`vat_rate.feedback.${value.vatRateId ? 'update' : 'create.single'}`), 'success');
        handleCloseVatRatesDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateVatRateMutation,
      createVatRateMutation,
      showSnackbar,
      t,
      handleCloseVatRatesDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddVatRate = useCallback(() => {
    setVatRatesDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('vat_rate.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getVatRatesColumns(t)}
          empty="vat_rate.text.no_vat_rates"
          initialState={initialState}
          rows={vatRates?.nodes ?? []}
          totalCount={vatRates?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddVatRate : undefined}
          onDelete={canDelete ? handleDelete('vat_rate', DeleteVatRatesDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditVatRate : undefined}
          onExport={canRead ? handleExport('id', ExportVatRatesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(vatRates?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={canRead ? handleViewVatRate : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {vatRatesDialogProps.open && (
        <VatRateDialog
          input={vatRatesDialogProps.input}
          readonly={vatRatesDialogProps.readonly}
          onClose={handleCloseVatRatesDialog}
          onSave={handleSaveVatRate}
        />
      )}
    </Card>
  );
}
