import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, string } from 'yup';

export const getTicketReminderSchema = (language: string, t: TFunction) =>
  object().shape({
    date: date()
      .required(getRequiredTranslation('ticket.field.reminder_date', t))
      .min(MIN_DATE, getDateMinTranslation('ticket.field.reminder_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('ticket.field.reminder_date', language, t)),
    summary: string().required(getRequiredTranslation('ticket.field.reminder_summary', t)),
  });

export const getTicketRemindersSchema = (language: string, t: TFunction) =>
  object().shape({
    reminders: array().of(getTicketReminderSchema(language, t)),
  });
