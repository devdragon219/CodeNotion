import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { WorkersFieldValues } from '../../../../interfaces/FormInputs/Worker';
import { getEmptyWorkerFormInput } from '../../../../utils/components/worker/initialValues';
import { getWorkersSchema } from '../../../../utils/components/worker/schemas/workers';
import { WorkerField } from '../Field/Field';
import { WorkerDialogProps } from './Dialog.types';

export const WorkerDialog = ({ input, onClose, onSave }: WorkerDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<WorkersFieldValues>({
    defaultValues: {
      workers: input ? [input.worker] : [getEmptyWorkerFormInput()],
    },
    resolver: yupResolver(getWorkersSchema(language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workers',
  });

  const handleAddWorker = useCallback(() => {
    append(getEmptyWorkerFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: WorkersFieldValues) => {
      onSave(
        input
          ? {
              ...input,
              worker: formValues.workers[0],
            }
          : formValues.workers,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`component.worker.dialog.${input ? 'edit_worker' : 'add_workers'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="component.worker.section_title.workers" />
            {input ? (
              <Grid2 size={12}>
                <WorkerField control={control} errors={errors} index={0} mode={FormMode.Edit} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <WorkerField control={control} errors={errors} index={index} mode={FormMode.Edit} />
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
                    onClick={handleAddWorker}
                  >
                    {t('component.worker.action.add_workers')}
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
