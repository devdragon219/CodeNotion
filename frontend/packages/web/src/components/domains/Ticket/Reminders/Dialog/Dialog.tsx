import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { DateField, Dialog, DialogContent, Form, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketReminderFormInput } from '../../../../../interfaces/FormInputs/Ticket';
import { getEmptyTicketReminderFormInput } from '../../../../../utils/ticket/initialValues';
import { getTicketReminderSchema } from '../../../../../utils/ticket/schemas/reminders';
import { ReminderDialogProps } from './Dialog.types';

export const ReminderDialog = ({ input, onClose, onSave }: ReminderDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TicketReminderFormInput>({
    defaultValues: input?.reminder ?? getEmptyTicketReminderFormInput(),
    resolver: yupResolver(getTicketReminderSchema(language, t)),
  });

  const onSubmit = useCallback(
    (formValues: TicketReminderFormInput) => {
      onSave(
        input
          ? {
              ...input,
              reminder: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`ticket.dialog.${input ? 'edit_reminder' : 'add_reminder'}`}>
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
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('ticket.field.reminder_date')}
                    error={!!errors.date?.message}
                    helperText={errors.date?.message}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('ticket.field.reminder_summary')}
                    error={!!errors.summary?.message}
                    helperText={errors.summary?.message}
                    required
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
