import { WarningAmber } from '@mui/icons-material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  ExportAssetTaxesDocument,
  GetAssetTaxesQueryVariables,
  useFinalizeAssetTaxesMutation,
  useGetAssetTaxesQuery,
  useSetAssetTaxPaymentsIssueOverriddenMutation,
} from '../../../gql/RealGimm.Web.AssetTax.operation';
import { AssetTaxFragment } from '../../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';
import { useFeature } from '../../../hooks/useFeature';
import { getAssetTaxesColumns } from '../../../utils/assetTax/getAssetTaxesColumns';
import { getAssetTaxesFilterInput } from '../../../utils/assetTax/getAssetTaxesFilterInput';
import { AssetTaxesActions } from '../../domains/AssetTaxesActions/AssetTaxesActions';
import { AssetTaxesTableProps } from './AssetTaxes.types';
import { FinalizeAssetTaxesDialog } from './FinalizeDialog/FinalizeDialog';
import { AssetTaxPaymentsIssuesDialog } from './PaymentsIssuesDialog/PaymentsIssuesDialog';

export const AssetTaxesTable = ({ currentYear, taxCalculatorId }: AssetTaxesTableProps) => {
  const { canRead, canUpdate } = useFeature(RawFeature.ASST_ASSET_TAX_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { initialState, pause, variables, handleExport, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetAssetTaxesQueryVariables>((variables) => ({
      ...variables,
      currentYear,
      taxCalculatorId,
    }));
  const [queryState, reexecuteQuery] = useGetAssetTaxesQuery({ pause, variables });
  const [assetTaxPaymentsIssuesDialogProps, setAssetTaxPaymentsIssuesDialogProps] = useState<AssetTaxFragment | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [isFinalizeAssetTaxesDialogOpen, setFinalizeAssetTaxesDialogOpen] = useState(false);
  const [, finalizeAssetTaxesMutation] = useFinalizeAssetTaxesMutation();
  const [, setAssetTaxPaymentsIssueOverriddenMutation] = useSetAssetTaxPaymentsIssueOverriddenMutation();
  const assetTaxes = useMemo(
    () => queryState.data?.assetTax.groupedPayments,
    [queryState.data?.assetTax.groupedPayments],
  );

  const showIssues = useCallback((row: AssetTaxFragment) => {
    const onClick = (e: MouseEvent<SVGElement>) => {
      e.stopPropagation();
      setAssetTaxPaymentsIssuesDialogProps(row);
    };

    return (
      <WarningAmber
        onClick={onClick}
        sx={(theme) => ({
          color: theme.palette.danger[300],
          cursor: 'pointer',
          width: 24,
          height: 24,
        })}
      />
    );
  }, []);
  const handleCloseAssetTaxIssuesDialog = useCallback(() => {
    setAssetTaxPaymentsIssuesDialogProps(null);
  }, []);
  const handleSaveAssetTaxPaymentsIssues = useCallback(
    async (assetTax: AssetTaxFragment) => {
      setLoading(true);
      const result = await setAssetTaxPaymentsIssueOverriddenMutation({
        taxCalculatorId,
        year: assetTax.year,
        managementSubjectId: assetTax.managementSubjectId,
        expectedDueDate: String(assetTax.expectedDueDate),
        inputValues:
          assetTax.payments?.map(({ id, isIssueOverridden }) => ({
            key: id,
            value: isIssueOverridden,
          })) ?? [],
      });
      setLoading(false);
      if (result.data?.assetTax.setIssueOverridden.isSuccess) {
        showSnackbar(t('asset_tax.feedback.override'), 'success');
        handleCloseAssetTaxIssuesDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.assetTax.setIssueOverridden.validationErrors);
      }
    },
    [
      handleCloseAssetTaxIssuesDialog,
      reexecuteQuery,
      setAssetTaxPaymentsIssueOverriddenMutation,
      showError,
      showSnackbar,
      t,
      taxCalculatorId,
    ],
  );

  const handleOpenFinalizeAssetTaxesDialog = useCallback(() => {
    setFinalizeAssetTaxesDialogOpen(true);
  }, []);
  const handleCloseFinalizeAssetTaxesDialog = useCallback(() => {
    setFinalizeAssetTaxesDialogOpen(false);
  }, []);
  const handleFinalizeAssetTaxes = useCallback(
    async (assetTaxes: AssetTaxFragment[]) => {
      setLoading(true);
      const result = await finalizeAssetTaxesMutation({
        taxCalculatorId,
        taxPaymentIds: assetTaxes.flatMap(({ payments }) => payments?.map(({ id }) => id) ?? []),
      });
      setLoading(false);
      if (result.data?.assetTax.setDefinitive.isSuccess) {
        showSnackbar(t(`asset_tax.feedback.finalize.${assetTaxes.length === 1 ? 'single' : 'multiple'}`), 'success');
        handleCloseFinalizeAssetTaxesDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.assetTax.setDefinitive.validationErrors);
      }
    },
    [
      finalizeAssetTaxesMutation,
      handleCloseFinalizeAssetTaxesDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      t,
      taxCalculatorId,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {isFinalizeAssetTaxesDialogOpen && (
        <FinalizeAssetTaxesDialog
          currentYear={currentYear}
          taxCalculatorId={taxCalculatorId}
          onClose={handleCloseFinalizeAssetTaxesDialog}
          onSave={handleFinalizeAssetTaxes}
        />
      )}
      <PrimaryTable
        columns={getAssetTaxesColumns(showIssues)}
        customTableActions={
          canUpdate ? <AssetTaxesActions onFinalize={handleOpenFinalizeAssetTaxesDialog} /> : undefined
        }
        empty="asset_tax.text.no_asset_taxes"
        initialState={initialState}
        rows={assetTaxes?.nodes ?? []}
        totalCount={assetTaxes?.totalCount ?? 0}
        useColumnVisibility={false}
        getRowId={({ year, managementSubjectId, expectedDueDate }) =>
          `${taxCalculatorId}_${year}_${managementSubjectId}_${expectedDueDate}`
        }
        onExport={
          canRead
            ? handleExport(['year', 'managementSubjectId', 'expectedDueDate'], ExportAssetTaxesDocument)
            : undefined
        }
        onFilter={handleFilter(getAssetTaxesFilterInput)}
        onPageChange={handlePageChange(assetTaxes?.pageInfo)}
        onSort={handleSort()}
        onStateChange={setInitialState}
        onView={
          canRead
            ? (row) => {
                navigate(
                  [
                    '/app/tax-management/asset-taxes',
                    currentYear ? null : 'history',
                    taxCalculatorId,
                    row.year,
                    row.managementSubjectId,
                    row.expectedDueDate,
                  ]
                    .filter((it) => !!it)
                    .join('/'),
                );
              }
            : undefined
        }
      />
      {assetTaxPaymentsIssuesDialogProps && (
        <AssetTaxPaymentsIssuesDialog
          assetTax={assetTaxPaymentsIssuesDialogProps}
          onClose={handleCloseAssetTaxIssuesDialog}
          onSave={canUpdate ? handleSaveAssetTaxPaymentsIssues : undefined}
        />
      )}
    </>
  );
};
