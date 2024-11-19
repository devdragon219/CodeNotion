import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getEmptyFacilityContractFrameworkAgreementFormInput } from '../../../../../utils/facilityContract/initialValues';
import { getFacilityContractFrameworkAgreementsSchema } from '../../../../../utils/facilityContract/schemas/generalData';
import { FrameworkAgreementField } from '../Field/Field';
import { FrameworkAgreementDialogProps } from './Dialog.types';

export const FrameworkAgreementDialog = ({ input, onClose, onSave }: FrameworkAgreementDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      frameworkAgreements: input ? [input.frameworkAgreement] : [getEmptyFacilityContractFrameworkAgreementFormInput()],
    },
    resolver: yupResolver(getFacilityContractFrameworkAgreementsSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'frameworkAgreements',
  });

  const handleAddFrameworkAgreement = useCallback(() => {
    append(getEmptyFacilityContractFrameworkAgreementFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: FacilityContractFormInput) => {
      onSave(
        input
          ? {
              ...input,
              frameworkAgreement: formValues.frameworkAgreements[0],
            }
          : formValues.frameworkAgreements,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`facility_contract.dialog.${input ? 'edit' : 'add'}_framework_agreement`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="ticket.section_title.reminder" />
            {input ? (
              <Grid2 size={12}>
                <FrameworkAgreementField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <FrameworkAgreementField control={control} errors={errors} index={index} />
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
                    onClick={handleAddFrameworkAgreement}
                  >
                    {t('facility_contract.action.add_framework_agreement')}
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
