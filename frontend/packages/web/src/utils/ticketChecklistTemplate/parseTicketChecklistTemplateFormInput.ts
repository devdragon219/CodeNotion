import { TicketChecklistTemplateInput } from '@realgimm5/frontend-common/gql/types';

import { TicketChecklistTemplateFormInput } from '../../interfaces/FormInputs/TicketChecklistTemplate';

export const parseTicketChecklistTemplateFormInputToTicketChecklistTemplateInput = (
  ticketChecklistTemplate: TicketChecklistTemplateFormInput,
): TicketChecklistTemplateInput => ({
  catalogueTypeId: ticketChecklistTemplate.catalogueType!.catalogueTypeId!,
  costBaseFactor: ticketChecklistTemplate.costBaseFactor!,
  internalCode: ticketChecklistTemplate.internalCode,
  name: ticketChecklistTemplate.name,
  onTriggerActivityIds: ticketChecklistTemplate.onCondition.activities.map(({ activityId }) => activityId!),
  onTriggerCraftId: ticketChecklistTemplate.onCondition.craft?.id,
  onTriggerInterventionTypeId: ticketChecklistTemplate.onCondition.interventionType?.id,
  preventativeActivityIds: ticketChecklistTemplate.preventative.activities.map(({ activityId }) => activityId!),
  preventativeCraftId: ticketChecklistTemplate.preventative.craft?.id,
  preventativeDaysOfWeek: ticketChecklistTemplate.preventative.daysOfWeek,
  preventativeInterventionTypeId: ticketChecklistTemplate.preventative.interventionType?.id,
  preventativePlannedPeriod: ticketChecklistTemplate.preventative.plannedPeriod,
  preventativeToleranceDays: ticketChecklistTemplate.preventative.toleranceDays,
  rawWorkCost: ticketChecklistTemplate.rawWorkCost!,
  safetyCost: ticketChecklistTemplate.safetyCost!,
  type: ticketChecklistTemplate.ticketChecklistTemplateType!,
});
