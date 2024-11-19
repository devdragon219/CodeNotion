import { FormMode } from '@realgimm5/frontend-common/enums';
import { TFunction } from 'i18next';

import { getTicketDocumentsAndImagesSchema } from './documents';
import { getTicketEstateUnitSchema } from './estateUnit';
import { getTicketFacilityContractSchema } from './facilityContract';
import { getTicketGeneralDataSchema } from './generalData';
import { getTicketQuoteSchema } from './quote';
import { getTicketRemindersSchema } from './reminders';
import { getTicketResolutionSchema } from './resolution';
import { getTicketTicketChecklistSchema } from './ticketChecklist';

export const getTicketSchema = (
  canUseInternalCode: boolean,
  language: string,
  mode: FormMode,
  t: TFunction,
  isSupplier = false,
) =>
  getTicketEstateUnitSchema(t)
    .concat(getTicketFacilityContractSchema(t))
    .concat(getTicketGeneralDataSchema(canUseInternalCode, language, mode, t, isSupplier))
    .concat(getTicketTicketChecklistSchema(t))
    .concat(getTicketQuoteSchema(language, mode, t))
    .concat(getTicketRemindersSchema(language, t))
    .concat(getTicketResolutionSchema(language, t, isSupplier))
    .concat(getTicketDocumentsAndImagesSchema(language, t));
