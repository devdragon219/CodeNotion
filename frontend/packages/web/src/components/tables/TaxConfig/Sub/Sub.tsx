import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../../enums/RawFeature';
import { TaxConfigSubTableRowFragment } from '../../../../gql/RealGimm.Web.TaxConfigSubTableRow.fragment';
import {
  DeleteTaxConfigSubTableValuesDocument,
  ExportTaxConfigSubTableValuesDocument,
  GetTaxConfigSubTableValuesQueryVariables,
  useAddTaxConfigSubTableValueMutation,
  useGetTaxConfigSubTableValuesQuery,
  useUpdateTaxConfigSubTableValueMutation,
} from '../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { TaxConfigValueFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { getTaxConfigSubTableColumns } from '../../../../utils/components/taxConfig/getTaxConfigSubTableColumns';
import { parseTaxConfigValueFormInputToTaxConfigSubValueRowInput } from '../../../../utils/components/taxConfig/parseTaxConfigValueFormInput';
import {
  getTaxConfigTableEmptyLabel,
  getTaxConfigValueFeedbackBaseKey,
} from '../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueDialog } from '../../../dialogs/TaxConfigValue/TaxConfigValue';
import { TaxConfigSubTableProps } from './Sub.types';

export const TaxConfigSubTable = ({ calculator, subTable, tableCode }: TaxConfigSubTableProps) => {
  const { canCreate, canDelete, canRead, canUpdate } = useFeature(RawFeature.COMMON_TAX_RATES);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleExport, handlePageChange, setInitialState } =
    useTable<GetTaxConfigSubTableValuesQueryVariables>((variables) => ({
      ...variables,
      calculatorId: calculator.id,
      subTable: subTable.code,
      tableCode,
      year: subTable.year,
    }));
  const [queryState, reexecuteQuery] = useGetTaxConfigSubTableValuesQuery({ pause, variables });
  const [, addTaxConfigSubTableValue] = useAddTaxConfigSubTableValueMutation();
  const [, updateTaxConfigSubTableValue] = useUpdateTaxConfigSubTableValueMutation();
  const [loading, setLoading] = useState(false);
  const [dialogProps, setDialogProps] = useState<{
    open: boolean;
    readonly?: boolean;
    row?: TaxConfigSubTableRowFragment;
  }>({ open: false });
  const table = useMemo(
    () =>
      calculator.configuration.availableSubTables
        .find(({ key }) => key === tableCode)!
        .value.find(({ code }) => code === subTable.code)!,
    [calculator.configuration.availableSubTables, subTable.code, tableCode],
  );
  const values = useMemo(
    () => queryState.data?.taxConfiguration.listSubTableValue,
    [queryState.data?.taxConfiguration.listSubTableValue],
  );

  const handleOpenCreateDialog = useCallback(() => {
    setDialogProps({
      open: true,
    });
  }, []);
  const handleOpenDialog = useCallback(
    (readonly: boolean) => (row: TaxConfigSubTableRowFragment) => {
      setDialogProps({
        open: true,
        readonly,
        row,
      });
    },
    [],
  );
  const handleCloseDialog = useCallback(() => {
    setDialogProps({ open: false });
  }, []);

  const handleSaveTaxConfigValue = useCallback(
    async (value: TaxConfigValueFormInput) => {
      const execute = async () => {
        if (value.taxConfigValueId) {
          const result = await updateTaxConfigSubTableValue({
            calculatorId: calculator.id,
            tableCode,
            year: subTable.year,
            subTableValueId: value.taxConfigValueId,
            input: parseTaxConfigValueFormInputToTaxConfigSubValueRowInput(subTable.code, value),
          });
          return result.data?.taxConfiguration.updateSubTableValue;
        } else {
          const result = await addTaxConfigSubTableValue({
            calculatorId: calculator.id,
            tableCode,
            year: subTable.year,
            input: parseTaxConfigValueFormInputToTaxConfigSubValueRowInput(subTable.code, value),
          });
          return result.data?.taxConfiguration.addSubTableValue;
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(
            `${getTaxConfigValueFeedbackBaseKey(calculator.description, tableCode)}.feedback.${value.taxConfigValueId ? 'update' : 'create'}` as ParseKeys,
          ),
          'success',
        );
        handleCloseDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      addTaxConfigSubTableValue,
      calculator.description,
      calculator.id,
      handleCloseDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      subTable.code,
      subTable.year,
      t,
      tableCode,
      updateTaxConfigSubTableValue,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        color={subTable.color}
        columns={getTaxConfigSubTableColumns(table.columns)}
        empty={getTaxConfigTableEmptyLabel(calculator.description, tableCode)}
        initialState={initialState}
        rowActionsVariant={table.canAddRemoveRows ? 'menu' : 'inline'}
        rows={values?.nodes ?? []}
        totalCount={values?.totalCount ?? 0}
        useColumnVisibility={false}
        useRowSelection={subTable.color !== 'secondary'}
        getRowId={({ id }) => String(id)}
        onAdd={canCreate && table.canAddRemoveRows ? handleOpenCreateDialog : undefined}
        onDelete={
          canDelete && table.canAddRemoveRows
            ? handleDelete(
                getTaxConfigValueFeedbackBaseKey(calculator.description, tableCode),
                DeleteTaxConfigSubTableValuesDocument,
                reexecuteQuery,
                (rows) => ({
                  calculatorId: calculator.id,
                  tableCode,
                  year: subTable.year,
                  subTableValueIds: Array.isArray(rows) ? rows.map(({ id }) => id) : [rows.id],
                }),
              )
            : undefined
        }
        onEdit={canUpdate ? handleOpenDialog(false) : undefined}
        onExport={canRead ? handleExport('id', ExportTaxConfigSubTableValuesDocument) : undefined}
        onStateChange={setInitialState}
        onPageChange={handlePageChange(values?.pageInfo)}
        onView={canRead ? handleOpenDialog(true) : undefined}
      />
      {dialogProps.open && (
        <TaxConfigValueDialog
          calculator={calculator.description}
          readonly={dialogProps.readonly}
          row={dialogProps.row}
          table={table}
          onClose={handleCloseDialog}
          onSave={handleSaveTaxConfigValue}
        />
      )}
    </>
  );
};
