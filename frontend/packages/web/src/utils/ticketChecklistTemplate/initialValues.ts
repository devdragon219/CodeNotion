import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';

import {
  TicketChecklistTemplateFormInput,
  TicketChecklistTemplateOnConditionMaintenanceFormInput,
  TicketChecklistTemplatePreventativeMaintenanceFormInput,
} from '../../interfaces/FormInputs/TicketChecklistTemplate';

export const getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput =
  (): TicketChecklistTemplateOnConditionMaintenanceFormInput => ({
    activities: [],
    craft: null,
    interventionType: null,
  });

export const getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput =
  (): TicketChecklistTemplatePreventativeMaintenanceFormInput => ({
    activities: [],
    craft: null,
    daysOfWeek: [],
    interventionType: null,
    plannedPeriod: null,
    toleranceDays: 0,
  });

export const getEmptyTicketChecklistTemplateFormInput = (
  ticketChecklistTemplateType: TicketChecklistTemplateType | null = null,
): TicketChecklistTemplateFormInput => ({
  catalogueCategory: null,
  catalogueSubCategory: null,
  catalogueType: null,
  costBaseFactor: null,
  internalCode: '',
  name: '',
  onCondition: getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput(),
  preventative: getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput(),
  rawWorkCost: null,
  safetyCost: null,
  ticketChecklistTemplateId: null,
  ticketChecklistTemplateType,
});
