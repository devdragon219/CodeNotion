import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';
import { getEmptyCatalogueTypeActivityFormInput } from '../../../../../utils/catalogueType/initialValues';
import { getCatalogueTypeActivitiesSchema } from '../../../../../utils/catalogueType/schemas/activities';
import { ActivityField } from '../Field/Field';
import { ActivityDialogProps } from './Dialog.types';

export const ActivityDialog = ({ input, onClose, onSave }: ActivityDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CatalogueTypeFormInput>({
    defaultValues: {
      activities: input ? [input.activity] : [getEmptyCatalogueTypeActivityFormInput()],
    },
    resolver: yupResolver(getCatalogueTypeActivitiesSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const handleAddActivity = useCallback(() => {
    append(getEmptyCatalogueTypeActivityFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: CatalogueTypeFormInput) => {
      onSave(
        input
          ? {
              ...input,
              activity: formValues.activities[0],
            }
          : formValues.activities,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`catalogue_type.dialog.activity.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="catalogue_type.section_title.activities" />
            {input ? (
              <Grid2 size={12}>
                <ActivityField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <ActivityField control={control} errors={errors} index={index} />
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
                    onClick={handleAddActivity}
                  >
                    {t('catalogue_type.action.add_activity')}
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
