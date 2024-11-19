import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PriceListMeasurementUnitDialog } from '../../../../../components/dialogs/PriceListMeasurementUnit/PriceListMeasurementUnit';
import { RawFeature } from '../../../../../enums/RawFeature';
import { PriceListMeasurementUnitFragment } from '../../../../../gql/RealGimm.Web.PriceListMeasurementUnit.fragment';
import {
  DeletePriceListMeasurementUnitsDocument,
  ExportPriceListMeasurementUnitsDocument,
  GetPriceListMeasurementUnitsQueryVariables,
  useAddPriceListMeasurementUnitMutation,
  useGetPriceListMeasurementUnitsQuery,
  useUpdatePriceListMeasurementUnitMutation,
} from '../../../../../gql/RealGimm.Web.PriceListMeasurementUnit.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { PriceListMeasurementUnitFormInput } from '../../../../../interfaces/FormInputs/PriceListMeasurementUnit';
import { getPriceListMeasurementUnitColumns } from '../../../../../utils/priceListMeasurementUnit/getPriceListMeasurementUnitColumns';
import { getPriceListMeasurementUnitsSortInput } from '../../../../../utils/priceListMeasurementUnit/getPriceListMeasurementUnitsSortInput';
import { parsePriceListMeasurementUnitFormInputToPriceListMeasurementUnitInput } from '../../../../../utils/priceListMeasurementUnit/parsePriceListMeasurementUnitFormInput';
import { parsePriceListMeasurementUnitToPriceListMeasurementUnitFormInput } from '../../../../../utils/priceListMeasurementUnit/parsePriceListMeasurementUnitFragment';

export default function PriceListMeasurementUnits() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONFIG);
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
  } = useTable<GetPriceListMeasurementUnitsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetPriceListMeasurementUnitsQuery({ pause, variables });
  const [, createPriceListMeasurementUnitMutation] = useAddPriceListMeasurementUnitMutation();
  const [, updatePriceListMeasurementUnitMutation] = useUpdatePriceListMeasurementUnitMutation();
  const [loading, setLoading] = useState(false);
  const [priceListMeasurementUnitDialogProps, setPriceListMeasurementUnitDialogProps] = useState<{
    input?: PriceListMeasurementUnitFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const priceListMeasurementUnits = useMemo(
    () => queryState.data?.priceListMeasurementUnit.listPriceListMeasurementUnits,
    [queryState.data],
  );

  const handleClosePriceListMeasurementUnitDialog = useCallback(() => {
    setPriceListMeasurementUnitDialogProps({ open: false });
  }, []);

  const handleEditPriceListMeasurementUnit = useCallback((row: PriceListMeasurementUnitFragment) => {
    setPriceListMeasurementUnitDialogProps({
      input: parsePriceListMeasurementUnitToPriceListMeasurementUnitFormInput(row),
      open: true,
    });
  }, []);

  const handleViewPriceListMeasurementUnit = useCallback((row: PriceListMeasurementUnitFragment) => {
    setPriceListMeasurementUnitDialogProps({
      input: parsePriceListMeasurementUnitToPriceListMeasurementUnitFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSavePriceListMeasurementUnit = useCallback(
    async (value: PriceListMeasurementUnitFormInput) => {
      const savePriceListMeasurementUnit = async () => {
        if (value.priceListMeasurementUnitId) {
          const result = await updatePriceListMeasurementUnitMutation({
            priceListMeasurementUnitId: value.priceListMeasurementUnitId,
            input: parsePriceListMeasurementUnitFormInputToPriceListMeasurementUnitInput(value),
          });
          return result.data?.priceListMeasurementUnit.update;
        } else {
          const result = await createPriceListMeasurementUnitMutation({
            input: parsePriceListMeasurementUnitFormInputToPriceListMeasurementUnitInput(value),
          });
          return result.data?.priceListMeasurementUnit.add;
        }
      };
      setLoading(true);
      const result = await savePriceListMeasurementUnit();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(`price_list_measurement_unit.feedback.${value.priceListMeasurementUnitId ? 'update' : 'create'}`),
          'success',
        );
        handleClosePriceListMeasurementUnitDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updatePriceListMeasurementUnitMutation,
      createPriceListMeasurementUnitMutation,
      showSnackbar,
      t,
      handleClosePriceListMeasurementUnitDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddPriceListMeasurementUnit = useCallback(() => {
    setPriceListMeasurementUnitDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('price_list_measurement_unit.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getPriceListMeasurementUnitColumns()}
          empty="price_list_measurement_unit.text.no_price_list_measurement_units"
          initialState={initialState}
          rows={priceListMeasurementUnits?.nodes ?? []}
          totalCount={priceListMeasurementUnits?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddPriceListMeasurementUnit : undefined}
          onDelete={
            canDelete
              ? handleDelete('price_list_measurement_unit', DeletePriceListMeasurementUnitsDocument, reexecuteQuery)
              : undefined
          }
          onEdit={canUpdate ? handleEditPriceListMeasurementUnit : undefined}
          onExport={canRead ? handleExport('id', ExportPriceListMeasurementUnitsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(priceListMeasurementUnits?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getPriceListMeasurementUnitsSortInput)}
          onView={canRead ? handleViewPriceListMeasurementUnit : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {priceListMeasurementUnitDialogProps.open && (
        <PriceListMeasurementUnitDialog
          input={priceListMeasurementUnitDialogProps.input}
          readonly={priceListMeasurementUnitDialogProps.readonly}
          onClose={handleClosePriceListMeasurementUnitDialog}
          onSave={handleSavePriceListMeasurementUnit}
        />
      )}
    </Card>
  );
}
