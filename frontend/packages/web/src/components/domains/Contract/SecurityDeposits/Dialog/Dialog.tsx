import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractSecurityDepositFormInput } from '../../../../../utils/contract/initialValues';
import { getContractSecurityDepositsSchema } from '../../../../../utils/contract/schemas/securityDeposits';
import { SecurityDepositFieldAccordion } from '../Accordion/Accordion';
import { SecurityDepositField } from '../Field/Field';
import { SecurityDepositDialogProps } from './Dialog.types';

export const SecurityDepositDialog = ({ input, onClose, onSave }: SecurityDepositDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ContractFormInput>({
    defaultValues: {
      securityDeposits: input ? [input.securityDeposit] : [getEmptyContractSecurityDepositFormInput()],
    },
    resolver: yupResolver(getContractSecurityDepositsSchema(language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'securityDeposits',
  });

  const handleAddSecurityDeposit = useCallback(() => {
    append(getEmptyContractSecurityDepositFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: ContractFormInput) => {
      onSave(
        input
          ? {
              ...input,
              securityDeposit: formValues.securityDeposits[0],
            }
          : formValues.securityDeposits,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`contract.dialog.security_deposit.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="contract.section_title.security_deposits" />
            {input ? (
              <Grid2 size={12}>
                <SecurityDepositField control={control} errors={errors} index={0} setValue={setValue} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <SecurityDepositFieldAccordion
                            control={control}
                            errors={errors}
                            index={index}
                            setValue={setValue}
                          />
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
                    onClick={handleAddSecurityDeposit}
                  >
                    {t('contract.action.add_security_deposit')}
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
