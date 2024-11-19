import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Typography } from '@mui/material';
import { SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermPaymentFormInput } from '../../../../interfaces/FormInputs/AdministrationTermPayment';
import { calcTaxAmounts } from '../../../../utils/administrationTerm/calcTaxAmounts';
import { AdministrationTermPaymentsTable } from '../PaymentsTable/PaymentsTable';
import { AdministrationTermPaymentsDialog } from './Dialog/Dialog';
import { AdministrationTermPaymentsDialogInput } from './Dialog/Dialog.types';
import { AdministrationTermPaymentsProps } from './Payments.types';

export const AdministrationTermPayments = ({ control, readonly }: AdministrationTermPaymentsProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [administrationTermPaymentsDialogProps, setAdministrationTermPaymentsDialogProps] = useState<{
    input?: AdministrationTermPaymentsDialogInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });

  const installments = useWatch({ control, name: 'installments' });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payments',
  });
  const handleAddPayment = useCallback(() => {
    setAdministrationTermPaymentsDialogProps({ open: true });
  }, []);

  const handleCloseAdministrationTermPaymentsDialog = useCallback(() => {
    setAdministrationTermPaymentsDialogProps({ open: false });
  }, []);

  const handleEditPayment = useCallback(
    (index: number) => {
      setAdministrationTermPaymentsDialogProps({
        input: {
          payment: fields[index],
          index,
        },
        open: true,
      });
    },
    [fields],
  );

  const handleSavePayments = useCallback(
    (value: AdministrationTermPaymentFormInput[] | AdministrationTermPaymentsDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.payment);
      }
      handleCloseAdministrationTermPaymentsDialog();
    },
    [append, handleCloseAdministrationTermPaymentsDialog, update],
  );

  const totalPaid = useMemo(
    () =>
      fields.reduce(
        (totalPaid, currentPayment) =>
          totalPaid +
          currentPayment.installments.reduce((paymentTotal, currentInstallment) => {
            const installment = installments.find(({ guid }) => guid === currentInstallment);
            return (
              paymentTotal +
              calcTaxAmounts(
                Number(installment?.amount),
                Number(installment?.billItemType?.administrationVR?.ratePercent),
              ).totalAmount
            );
          }, 0),
        0,
      ),
    [fields, installments],
  );

  const canAddPayments = useMemo(() => {
    const installmentsGuids = installments.map((installment) => installment.guid);
    const paidInstallmentsGuids = fields.reduce<string[]>(
      (paidInstallmentsGuids, currentPayment) => [...paidInstallmentsGuids, ...currentPayment.installments],
      [],
    );

    return installmentsGuids.some((guid) => !paidInstallmentsGuids.includes(guid));
  }, [fields, installments]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          !readonly && canAddPayments ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddPayment}>
              {t('administration_term.action.add_payment')}
            </Button>
          ) : undefined
        }
        value="administration_term.section_title.payments"
      />
      <Grid2 size={12}>
        <Typography variant="bodyMd" sx={{ mb: 2 }}>
          {t('administration_term.text.total_paid')}: {parseNumberToCurrency(totalPaid, language)}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <AdministrationTermPaymentsTable
          installments={installments}
          payments={fields}
          onEdit={readonly ? undefined : handleEditPayment}
          onDelete={readonly ? undefined : remove}
        />
      </Grid2>
      {administrationTermPaymentsDialogProps.open && (
        <AdministrationTermPaymentsDialog
          input={administrationTermPaymentsDialogProps.input}
          readonly={administrationTermPaymentsDialogProps.readonly}
          onClose={handleCloseAdministrationTermPaymentsDialog}
          onSave={handleSavePayments}
          installments={installments}
          existingPayments={fields}
        />
      )}
    </Grid2>
  );
};
