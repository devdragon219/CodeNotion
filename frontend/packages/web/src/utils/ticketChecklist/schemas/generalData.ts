import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getTicketChecklistGeneralDataSchema = (t: TFunction) =>
  object().shape({
    internalCode: string().required(getRequiredTranslation('ticket_checklist.field.internal_code', t)),
    name: string().required(getRequiredTranslation('ticket_checklist.field.name', t)),
  });
