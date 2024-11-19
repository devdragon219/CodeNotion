import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Stack } from '@mui/material';
import {
  CheckboxField,
  Dialog,
  DialogContent,
  SecondaryTable,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssetTaxPaymentsIssuesDialogProps } from './PaymentsIssuesDialog.types';

export const AssetTaxPaymentsIssuesDialog = ({ assetTax, onClose, onSave }: AssetTaxPaymentsIssuesDialogProps) => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState(assetTax.payments ?? []);

  const handleToggleAll = useCallback(() => {
    setPayments((payments) => {
      const isIssueOverridden = !payments.every(({ isIssueOverridden }) => isIssueOverridden);
      return payments.map((payment) => ({
        ...payment,
        isIssueOverridden,
      }));
    });
  }, []);

  const handleCheckbox = useCallback(
    (index: number) => () => {
      setPayments((payments) =>
        payments.map((payment, idx) =>
          idx === index
            ? {
                ...payment,
                isIssueOverridden: !payment.isIssueOverridden,
              }
            : payment,
        ),
      );
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave({
        ...assetTax,
        payments,
      });
    } else {
      onClose();
    }
  }, [assetTax, onClose, onSave, payments]);

  return (
    <Dialog fullScreen open title="asset_tax.dialog.issues" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={handleSave}>
            {t(onSave ? 'common.button.save' : 'core.button.close')}
          </Button>
        }
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="asset_tax.section_title.issues" />
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField label={t('asset_tax.field.year')} value={assetTax.year} readonly required />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t('asset_tax.field.management_subject')}
              value={assetTax.managementSubject}
              readonly
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'asset_tax.field.estate',
                'asset_tax.field.estate_unit',
                'asset_tax.field.issues',
                <Stack key="override" direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <CheckboxField
                    sx={{ m: '-9px' }}
                    checked={payments.every(({ isIssueOverridden }) => isIssueOverridden)}
                    indeterminate={payments.some(({ isIssueOverridden }) => isIssueOverridden)}
                    onChange={handleToggleAll}
                  />
                  {t('asset_tax.field.override')}
                </Stack>,
              ]}
              rows={payments.map((payment, index) => [
                payment.assetTaxCalculation?.cadastralUnit.estateUnit.estate.internalCode,
                payment.assetTaxCalculation?.cadastralUnit.estateUnit.internalCode,
                payment.issue ? t(`common.enum.calculation_issue.${payment.issue}`) : null,
                <CheckboxField
                  key={payment.id}
                  sx={{ m: '-9px' }}
                  checked={payment.isIssueOverridden}
                  onChange={handleCheckbox(index)}
                />,
              ])}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
