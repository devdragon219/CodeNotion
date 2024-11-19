import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';
import { getEmptyEstateStairFormInput } from '../../../../../utils/estate/initialValues';
import { StairField } from '../StairField/StairField';
import { StairDialogProps } from './StairDialog.types';

export const StairDialog = ({ input, onClose, onSave }: StairDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EstateFormInput>({
    defaultValues: {
      stairs: input ? [input.stair] : [getEmptyEstateStairFormInput()],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stairs',
  });

  const handleAddStair = useCallback(() => {
    append(getEmptyEstateStairFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: EstateFormInput) => {
      onSave(
        input
          ? {
              ...input,
              stair: formValues.stairs[0],
            }
          : formValues.stairs,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`estate.dialog.stair.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {input ? (
              <Grid2 size={12}>
                <StairField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <StairField control={control} errors={errors} index={index} />
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
                    onClick={handleAddStair}
                  >
                    {t('estate.action.add_stairs')}
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
