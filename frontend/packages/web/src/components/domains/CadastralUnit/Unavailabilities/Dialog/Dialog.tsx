import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';
import { getEmptyCadastralUnavailabilityFormInput } from '../../../../../utils/cadastralUnit/initialValues';
import { getCadastralUnitUnavailabilitiesSchema } from '../../../../../utils/cadastralUnit/schemas/unavailabilities';
import { UnavailabilityField } from '../Field/Field';
import { UnavailabilityDialogProps } from './Dialog.types';

export const UnavailabilityDialog = ({ input, onClose, onSave }: UnavailabilityDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: {
      unavailabilities: input ? [input.unavailability] : [getEmptyCadastralUnavailabilityFormInput()],
    },
    resolver: yupResolver(getCadastralUnitUnavailabilitiesSchema(language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'unavailabilities',
  });

  const handleAddUnavailability = useCallback(() => {
    append(getEmptyCadastralUnavailabilityFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: CadastralUnitFormInput) => {
      onSave(
        input
          ? {
              ...input,
              unavailability: formValues.unavailabilities[0],
            }
          : formValues.unavailabilities,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`cadastral_unit.dialog.unavailability.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="cadastral_unit.section_title.unavailability" />
            {input ? (
              <Grid2 size={12}>
                <UnavailabilityField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <UnavailabilityField control={control} errors={errors} index={index} />
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
                    onClick={handleAddUnavailability}
                  >
                    {t('cadastral_unit.action.add_unavailability')}
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
