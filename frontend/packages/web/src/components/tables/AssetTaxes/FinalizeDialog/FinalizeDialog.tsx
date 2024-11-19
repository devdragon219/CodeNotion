import { CheckCircleOutline, Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ConfirmationDialog, Dialog, DialogContent, Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAllAssetTaxesQuery } from '../../../../gql/RealGimm.Web.AssetTax.operation';
import { AssetTaxFragment } from '../../../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';
import { FinalizeAssetTaxesDialogProps } from './FinalizeDialog.types';

export const FinalizeAssetTaxesDialog = ({
  currentYear,
  taxCalculatorId,
  onClose,
  onSave,
}: FinalizeAssetTaxesDialogProps) => {
  const { t } = useTranslation();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [value, setValue] = useState<AssetTaxFragment[]>([]);
  const [queryState] = useGetAllAssetTaxesQuery({
    variables: {
      currentYear,
      taxCalculatorId,
      where: {
        payments: {
          none: {
            isDefinitive: {
              eq: true,
            },
          },
        },
      },
    },
  });
  const assetTaxes = useMemo(() => queryState.data?.assetTax.fullGroupedPayments ?? [], [queryState.data]);

  const showConfirmationDialog = useCallback(() => {
    setConfirmationVisible(true);
  }, []);
  const hideConfirmationDialog = useCallback(() => {
    setConfirmationVisible(false);
  }, []);

  const handleSave = useCallback(() => {
    onSave(value);
  }, [value, onSave]);

  return isConfirmationVisible ? (
    <ConfirmationDialog
      open
      onClose={hideConfirmationDialog}
      type="alert"
      icon={Warning}
      title="asset_tax.dialog.finalize_asset_taxes.confirmation"
      actions={
        <>
          <Button color="secondary" onClick={hideConfirmationDialog}>
            {t('common.button.cancel')}
          </Button>
          <Button color="primary" variant="contained" onClick={handleSave}>
            {t('asset_tax.dialog.finalize_asset_taxes.action')}
          </Button>
        </>
      }
    />
  ) : (
    <Dialog fullScreen open title="asset_tax.dialog.finalize_asset_taxes.title" onClose={onClose}>
      {queryState.fetching && <Loader />}
      <DialogContent
        fixedHeight
        action={
          <Button
            color="primary"
            variant="contained"
            startIcon={<CheckCircleOutline />}
            disabled={value.length === 0}
            onClick={showConfirmationDialog}
          >
            {t('asset_tax.dialog.finalize_asset_taxes.action')}
          </Button>
        }
      >
        <TransferList
          columns={[
            {
              id: 'year',
              type: 'number',
              label: 'asset_tax.field.year',
              enableColumnFilter: true,
              enableSorting: true,
            },
            {
              id: 'managementSubject',
              label: 'asset_tax.field.management_subject',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'lastUpdate',
              label: 'asset_tax.field.last_update',
              type: 'date',
              enableColumnFilter: true,
              enableSorting: true,
            },
            {
              id: 'expectedDueDate',
              label: 'asset_tax.field.expected_due_date',
              type: 'date',
              enableColumnFilter: true,
              enableSorting: true,
            },
          ]}
          empty="asset_tax.text.no_asset_taxes"
          rows={assetTaxes}
          titles={{
            left: 'asset_tax.section_title.select_asset_taxes',
            right: 'asset_tax.section_title.selected_asset_taxes',
          }}
          value={value}
          getRowId={({ year, managementSubjectId, expectedDueDate }) =>
            `${taxCalculatorId}_${year}_${managementSubjectId}_${expectedDueDate}`
          }
          onChange={setValue}
        />
      </DialogContent>
    </Dialog>
  );
};
