import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { isOfType, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractRecurringAdditionFormInput } from '../../../../interfaces/FormInputs/Contract';
import { RecurringAdditionDialog } from './Dialog/Dialog';
import { RecurringAdditionDialogInput } from './Dialog/Dialog.types';
import { ContractRecurringAdditionsProps } from './RecurringAdditions.types';

export const ContractRecurringAdditions = ({ control, readonly }: ContractRecurringAdditionsProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'recurringAdditions' });

  const [recurringAdditionDialogProps, setRecurringAdditionDialogProps] = useState<{
    input?: RecurringAdditionDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseRecurringAdditionDialog = useCallback(() => {
    setRecurringAdditionDialogProps({ open: false });
  }, []);
  const handleEditRecurringAddition = useCallback(
    (index: number) => {
      setRecurringAdditionDialogProps({
        input: { recurringAddition: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveRecurringAddition = useCallback(
    (value: ContractRecurringAdditionFormInput | RecurringAdditionDialogInput) => {
      if (isOfType<RecurringAdditionDialogInput>(value, ['index'])) {
        update(value.index, value.recurringAddition);
      } else {
        append(value);
      }
      handleCloseRecurringAdditionDialog();
    },
    [append, update, handleCloseRecurringAdditionDialog],
  );

  const handleAddRecurringAddition = useCallback(() => {
    setRecurringAdditionDialogProps({ open: true });
  }, []);
  const handleRemoveRecurringAddition = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {fields.length === 0 && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="contract.text.no_recurring_additions" />
      ) : (
        <>
          <SectionTitle
            actions={
              !readonly ? (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddRecurringAddition}
                >
                  {t('contract.action.add_recurring_addition')}
                </Button>
              ) : undefined
            }
            value="contract.section_title.recurring_additions"
          />
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'contract.field.recurring_addition_bill_item',
                'contract.field.recurring_addition_amount_per_installment',
                'contract.field.recurring_addition_vat_rate',
                'contract.field.recurring_addition_vat_rate_percent',
                'contract.field.recurring_addition_accounting_item',
                'contract.field.recurring_addition_exclude_start_month',
                'contract.field.recurring_addition_exclude_end_month',
              ]}
              rows={fields.map((entry) => [
                entry.billItemType?.description,
                parseNumberToCurrency(entry.amountPerInstallment, language),
                entry.vatRate?.description,
                entry.vatRate?.ratePercent,
                entry.accountingItem?.description,
                entry.excludeStartMonth !== null ? t(`common.enum.month.${entry.excludeStartMonth}`) : null,
                entry.excludeEndMonth !== null ? t(`common.enum.month.${entry.excludeEndMonth}`) : null,
              ])}
              onRowDelete={readonly ? undefined : handleRemoveRecurringAddition}
              onRowEdit={readonly ? undefined : handleEditRecurringAddition}
            />
          </Grid2>
        </>
      )}
      {recurringAdditionDialogProps.open && (
        <RecurringAdditionDialog
          input={recurringAdditionDialogProps.input}
          onClose={handleCloseRecurringAdditionDialog}
          onSave={handleSaveRecurringAddition}
        />
      )}
    </Grid2>
  );
};
