import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { isOfType, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractOneshotAdditionFormInput } from '../../../../interfaces/FormInputs/Contract';
import { OneshotAdditionDialog } from './Dialog/Dialog';
import { OneshotAdditionDialogInput } from './Dialog/Dialog.types';
import { ContractOneshotAdditionsProps } from './OneshotAdditions.types';

export const ContractOneshotAdditions = ({ control, readonly }: ContractOneshotAdditionsProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'oneshotAdditions' });

  const [oneshotAdditionDialogProps, setOneshotAdditionDialogProps] = useState<{
    input?: OneshotAdditionDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseOneshotAdditionDialog = useCallback(() => {
    setOneshotAdditionDialogProps({ open: false });
  }, []);
  const handleEditOneshotAddition = useCallback(
    (index: number) => {
      setOneshotAdditionDialogProps({
        input: { oneshotAddition: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveOneshotAddition = useCallback(
    (value: ContractOneshotAdditionFormInput | OneshotAdditionDialogInput) => {
      if (isOfType<OneshotAdditionDialogInput>(value, ['index'])) {
        update(value.index, value.oneshotAddition);
      } else {
        append(value);
      }
      handleCloseOneshotAdditionDialog();
    },
    [append, update, handleCloseOneshotAdditionDialog],
  );

  const handleAddOneshotAddition = useCallback(() => {
    setOneshotAdditionDialogProps({ open: true });
  }, []);
  const handleRemoveOneshotAddition = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {fields.length === 0 && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="contract.text.no_oneshot_additions" />
      ) : (
        <>
          <SectionTitle
            actions={
              !readonly ? (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddOneshotAddition}
                >
                  {t('contract.action.add_oneshot_addition')}
                </Button>
              ) : undefined
            }
            value="contract.section_title.oneshot_additions"
          />
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'contract.field.oneshot_addition_bill_item',
                'contract.field.oneshot_addition_start_date',
                'contract.field.oneshot_addition_accounting_item',
                'contract.field.oneshot_addition_vat_rate',
                'contract.field.oneshot_addition_vat_rate_percent',
                'contract.field.oneshot_addition_amount',
              ]}
              rows={fields.map((entry) => [
                entry.billItemType?.description,
                entry.startDate,
                entry.accountingItem?.description,
                entry.vatRate?.description,
                entry.vatRate?.ratePercent,
                parseNumberToCurrency(entry.amount, language),
              ])}
              onRowDelete={readonly ? undefined : handleRemoveOneshotAddition}
              onRowEdit={readonly ? undefined : handleEditOneshotAddition}
            />
          </Grid2>
        </>
      )}
      {oneshotAdditionDialogProps.open && (
        <OneshotAdditionDialog
          input={oneshotAdditionDialogProps.input}
          onClose={handleCloseOneshotAdditionDialog}
          onSave={handleSaveOneshotAddition}
        />
      )}
    </Grid2>
  );
};
