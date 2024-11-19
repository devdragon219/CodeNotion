import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BillFormInput } from '../../../../../interfaces/FormInputs/Bill';
import { getEmptyBillRowFormInput } from '../../../../../utils/bill/initialValues';
import { getBillAccountingDataSchema } from '../../../../../utils/bill/schemas/accountingData';
import { BillRowField } from '../Field/Field';
import { BillRowDialogProps } from './Dialog.types';

export const BillRowDialog = ({ input, onClose, onSave }: BillRowDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<BillFormInput>({
    defaultValues: {
      billRows: input ? [input.billRow] : [getEmptyBillRowFormInput()],
    },
    resolver: yupResolver(getBillAccountingDataSchema(language, t, 0)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'billRows',
  });

  const handleAddBillRow = useCallback(() => {
    append(getEmptyBillRowFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: BillFormInput) => {
      onSave(
        input
          ? {
              ...input,
              billRow: formValues.billRows[0],
            }
          : formValues.billRows,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`bill.dialog.bill_row.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="bill.section_title.bill_rows" />
            {input ? (
              <Grid2 size={12}>
                <BillRowField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <BillRowField control={control} errors={errors} index={index} />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddBillRow}
                  >
                    {t('bill.action.add_bill_row')}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
