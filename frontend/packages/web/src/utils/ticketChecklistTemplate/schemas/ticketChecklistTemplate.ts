import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';

import { getTicketChecklistTemplateCostsSchema } from './costs';
import { getTicketChecklistTemplateGeneralDataSchema } from './generalData';
import { getTicketChecklistTemplateOnConditionMaintenanceSchema } from './onConditionMaintenance';
import { getTicketChecklistTemplatePreventativeMaintenanceSchema } from './preventativeMaintenance';

export const getTicketChecklistTemplateSchema = (
  canUseInternalCode: boolean,
  t: TFunction,
  type: TicketChecklistTemplateType | null,
) =>
  getTicketChecklistTemplateGeneralDataSchema(canUseInternalCode, t)
    .concat(getTicketChecklistTemplateCostsSchema(t))
    .concat(getTicketChecklistTemplatePreventativeMaintenanceSchema(t, 'all', type))
    .concat(getTicketChecklistTemplateOnConditionMaintenanceSchema(t, 'all', type));
