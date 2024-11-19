import { UpdateTicketChecklistInput } from '@realgimm5/frontend-common/gql/types';

import { TicketChecklistFormInput } from '../../interfaces/FormInputs/TicketChecklist';

export const parseTicketChecklistFormInputToTicketChecklistInput = (
  ticketChecklist: TicketChecklistFormInput,
): UpdateTicketChecklistInput => ({
  costBaseFactor: ticketChecklist.costBaseFactor!,
  internalCode: ticketChecklist.internalCode,
  name: ticketChecklist.name,
  onTriggerActivityIds: ticketChecklist.onCondition.activities.map(({ activityId }) => activityId!),
  preventativeActivityIds: ticketChecklist.preventative.activities.map(({ activityId }) => activityId!),
  preventativeDaysOfWeek: ticketChecklist.preventative.daysOfWeek,
  preventativePlannedPeriod: ticketChecklist.preventative.plannedPeriod,
  preventativeToleranceDays: ticketChecklist.preventative.toleranceDays,
  rawWorkCost: ticketChecklist.rawWorkCost!,
  safetyCost: ticketChecklist.safetyCost!,
});
