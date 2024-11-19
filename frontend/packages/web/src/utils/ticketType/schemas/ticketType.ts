import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getTicketTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('ticket_type.field.internal_code', t))
      .valid(canUseInternalCode, t('ticket_type.error.internal_code')),
    description: string().required(getRequiredTranslation('ticket_type.field.description', t)),
    ordering: number().required(getRequiredTranslation('ticket_type.field.ordering', t)),
  });
