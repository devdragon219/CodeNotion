import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { EmptyText, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketReminderFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { ReminderDialog } from './Dialog/Dialog';
import { ReminderDialogInput } from './Dialog/Dialog.types';
import { TicketRemindersProps } from './Reminders.types';

export const TicketReminders = ({ control, readonly }: TicketRemindersProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'reminders' });
  const [reminderDialogProps, setReminderDialogProps] = useState<{
    input?: ReminderDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseReminderDialog = useCallback(() => {
    setReminderDialogProps({ open: false });
  }, []);
  const handleEditReminder = useCallback(
    (index: number) => {
      setReminderDialogProps({ input: { reminder: fields[index], index }, open: true });
    },
    [fields],
  );
  const handleSaveReminder = useCallback(
    (value: TicketReminderFormInput | ReminderDialogInput) => {
      if ('index' in value) {
        update(value.index, value.reminder);
      } else {
        append(value);
      }
      handleCloseReminderDialog();
    },
    [append, update, handleCloseReminderDialog],
  );

  const handleAddReminder = useCallback(() => {
    setReminderDialogProps({ open: true });
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          !readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddReminder}>
              {t('ticket.action.add_reminder')}
            </Button>
          ) : undefined
        }
        value="ticket.section_title.reminders"
      />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={['ticket.field.reminder_date', 'ticket.field.reminder_summary']}
            rows={fields.map((entry) => [entry.date, entry.summary])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditReminder}
          />
        </Grid2>
      ) : readonly ? (
        <EmptyText value="ticket.text.no_reminders" />
      ) : (
        <></>
      )}
      {reminderDialogProps.open && (
        <ReminderDialog
          input={reminderDialogProps.input}
          onClose={handleCloseReminderDialog}
          onSave={handleSaveReminder}
        />
      )}
    </Grid2>
  );
};
