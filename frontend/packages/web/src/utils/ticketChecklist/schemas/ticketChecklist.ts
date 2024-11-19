import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';

import { getTicketChecklistCostsSchema } from './costs';
import { getTicketChecklistGeneralDataSchema } from './generalData';
import { getTicketChecklistOnConditionMaintenanceSchema } from './onConditionMaintenance';
import { getTicketChecklistPreventativeMaintenanceSchema } from './preventativeMaintenance';

export const getTicketChecklistSchema = (t: TFunction, type: TicketChecklistTemplateType | null) =>
  getTicketChecklistGeneralDataSchema(t)
    .concat(getTicketChecklistCostsSchema(t))
    .concat(getTicketChecklistPreventativeMaintenanceSchema(t, type))
    .concat(getTicketChecklistOnConditionMaintenanceSchema(t, type));
