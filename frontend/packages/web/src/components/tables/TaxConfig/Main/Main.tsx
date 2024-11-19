import { Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { ParseKeys } from 'i18next';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE } from '../../../../configs/taxCalculator';
import { RawFeature } from '../../../../enums/RawFeature';
import { TableFragment } from '../../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigMainTableRowFragment } from '../../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';
import {
  DeleteTaxConfigMainTableValuesDocument,
  ExportTaxConfigMainTableValuesDocument,
  GetTaxConfigMainTableValuesQueryVariables,
  useAddTaxConfigMainTableValueMutation,
  useGetTaxConfigMainTableValuesQuery,
  useUpdateTaxConfigMainTableValueMutation,
} from '../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { TaxConfigFormInput, TaxConfigValueFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { getTaxConfigMainTableColumns } from '../../../../utils/components/taxConfig/getTaxConfigMainTableColumns';
import { parseTaxConfigFormInputToTaxConfigInput } from '../../../../utils/components/taxConfig/parseTaxConfigFormInput';
import { parseTaxConfigValueFormInputToTaxConfigInput } from '../../../../utils/components/taxConfig/parseTaxConfigValueFormInput';
import {
  getTaxConfigTableEmptyLabel,
  getTaxConfigValueFeedbackBaseKey,
} from '../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueDialog } from '../../../dialogs/TaxConfigValue/TaxConfigValue';
import { TaxConfigCreateDialog } from '../../../wizards/TaxConfig/TaxConfig';
import { TaxConfigSubTableDialog } from './Dialog/Dialog';
import { TaxConfigMainTableProps } from './Main.types';

export const TaxConfigMainTable = ({ calculator, tableCode }: TaxConfigMainTableProps) => {
  const { canCreate, canDelete, canRead, canUpdate } = useFeature(RawFeature.COMMON_TAX_RATES);
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
  } = useTable<GetTaxConfigMainTableValuesQueryVariables>((variables) => ({
    ...variables,
    calculatorId: calculator.id,
    tableCode,
  }));
  const [queryState, reexecuteQuery] = useGetTaxConfigMainTableValuesQuery({ pause, variables });
  const [, addTaxConfigMainTableValue] = useAddTaxConfigMainTableValueMutation();
  const [, updateTaxConfigMainTableValue] = useUpdateTaxConfigMainTableValueMutation();
  const [loading, setLoading] = useState(false);
  const [dialogProps, setDialogProps] = useState<{
    open: boolean;
    readonly?: boolean;
    row?: TaxConfigMainTableRowFragment;
  }>({ open: false });
  const [subTableDialogProps, setSubTableDialogProps] = useState<{
    row: TaxConfigMainTableRowFragment;
    subTable: TableFragment;
  } | null>(null);
  const table = useMemo(
    () => calculator.configuration.availableMainTables.find(({ code }) => code === tableCode)!,
    [calculator.configuration.availableMainTables, tableCode],
  );
  const subTables = useMemo(
    () => calculator.configuration.availableSubTables.find(({ key }) => key === tableCode)?.value ?? [],
    [calculator.configuration.availableSubTables, tableCode],
  );
  const values = useMemo(
    () => queryState.data?.taxConfiguration.listTableValues,
    [queryState.data?.taxConfiguration.listTableValues],
  );

  const showAllButton = useCallback(
    (row: TaxConfigMainTableRowFragment, subTable: TableFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setSubTableDialogProps({ row, subTable });
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('tax_config.action.show_all')}
        </Typography>
      );
    },
    [t],
  );

  const handleCloseSubTableDialog = useCallback(() => {
    setSubTableDialogProps(null);
  }, []);

  const handleOpenCreateDialog = useCallback(() => {
    setDialogProps({
      open: true,
    });
  }, []);
  const handleOpenDialog = useCallback(
    (readonly: boolean) => (row: TaxConfigMainTableRowFragment) => {
      if (subTables.length === 0) {
        setDialogProps({
          open: true,
          readonly,
          row,
        });
      } else {
        const baseUrl = `/app/settings/tax-management/${tableCode === TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE ? 'revaluation-coefficients/history' : 'tax-rates'}`;
        navigate(`${baseUrl}/${calculator.id}/${tableCode}/${row.id}`, { state: { readonly } });
      }
    },
    [calculator.id, navigate, subTables.length, tableCode],
  );
  const handleCloseDialog = useCallback(() => {
    setDialogProps({ open: false });
  }, []);

  const handleSaveTaxConfigValue = useCallback(
    async (value: TaxConfigValueFormInput) => {
      const execute = async () => {
        if (value.taxConfigValueId) {
          const result = await updateTaxConfigMainTableValue({
            calculatorId: calculator.id,
            tableCode,
            tableValueId: value.taxConfigValueId,
            input: parseTaxConfigValueFormInputToTaxConfigInput(value),
          });
          return result.data?.taxConfiguration.updateTableValue;
        } else {
          const result = await addTaxConfigMainTableValue({
            calculatorId: calculator.id,
            tableCode,
            input: parseTaxConfigValueFormInputToTaxConfigInput(value),
          });
          return result.data?.taxConfiguration.addTableValue;
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
      addTaxConfigMainTableValue,
      calculator.description,
      calculator.id,
      handleCloseDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      t,
      tableCode,
      updateTaxConfigMainTableValue,
    ],
  );

  const handleSaveTaxConfig = useCallback(
    async (taxConfig: TaxConfigFormInput) => {
      const execute = async () => {
        if (taxConfig.table.taxConfigValueId) {
          const result = await updateTaxConfigMainTableValue({
            calculatorId: calculator.id,
            tableCode,
            tableValueId: taxConfig.table.taxConfigValueId,
            input: parseTaxConfigFormInputToTaxConfigInput(taxConfig),
          });
          return result.data?.taxConfiguration.updateTableValue;
        } else {
          const result = await addTaxConfigMainTableValue({
            calculatorId: calculator.id,
            tableCode,
            input: parseTaxConfigFormInputToTaxConfigInput(taxConfig),
          });
          return result.data?.taxConfiguration.addTableValue;
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(
            `${getTaxConfigValueFeedbackBaseKey(calculator.description, tableCode)}.feedback.${taxConfig.table.taxConfigValueId ? 'update' : 'create'}` as ParseKeys,
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
      addTaxConfigMainTableValue,
      calculator.description,
      calculator.id,
      handleCloseDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      t,
      tableCode,
      updateTaxConfigMainTableValue,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        columns={getTaxConfigMainTableColumns(table.columns, subTables, showAllButton)}
        empty={getTaxConfigTableEmptyLabel(calculator.description, tableCode)}
        initialState={initialState}
        rowActionsVariant={table.canAddRemoveRows ? 'menu' : 'inline'}
        rows={values?.nodes ?? []}
        totalCount={values?.totalCount ?? 0}
        useColumnVisibility={false}
        getRowId={({ id }) => String(id)}
        onAdd={canCreate && table.canAddRemoveRows ? handleOpenCreateDialog : undefined}
        onDelete={
          canDelete && table.canAddRemoveRows
            ? handleDelete(
                getTaxConfigValueFeedbackBaseKey(calculator.description, tableCode),
                DeleteTaxConfigMainTableValuesDocument,
                reexecuteQuery,
                (rows) => ({
                  calculatorId: calculator.id,
                  tableValueIds: Array.isArray(rows) ? rows.map(({ id }) => id) : [rows.id],
                }),
              )
            : undefined
        }
        onEdit={canUpdate ? handleOpenDialog(false) : undefined}
        onExport={canRead ? handleExport('id', ExportTaxConfigMainTableValuesDocument) : undefined}
        onFilter={handleFilter()}
        onSort={handleSort()}
        onStateChange={setInitialState}
        onPageChange={handlePageChange(values?.pageInfo)}
        onView={canRead ? handleOpenDialog(true) : undefined}
      />
      {subTableDialogProps && (
        <TaxConfigSubTableDialog
          {...subTableDialogProps}
          calculator={calculator}
          table={table}
          onClose={handleCloseSubTableDialog}
        />
      )}
      {dialogProps.open ? (
        subTables.length === 0 ? (
          <TaxConfigValueDialog
            calculator={calculator.description}
            readonly={dialogProps.readonly}
            row={dialogProps.row}
            table={table}
            onClose={handleCloseDialog}
            onSave={handleSaveTaxConfigValue}
          />
        ) : (
          <TaxConfigCreateDialog
            calculator={calculator}
            subTables={subTables}
            table={table}
            onClose={handleCloseDialog}
            onSave={handleSaveTaxConfig}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
};
