import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';

import { TicketChecklistFormInput, TicketChecklistsFormInput } from '../../interfaces/FormInputs/TicketChecklist';
import { getEmptyTicketChecklistTemplateFormInput } from '../ticketChecklistTemplate/initialValues';

export const getEmptyTicketChecklistFormInput = (
  ticketChecklistTemplateType: TicketChecklistTemplateType | null = null,
): TicketChecklistFormInput => ({
  ...getEmptyTicketChecklistTemplateFormInput(ticketChecklistTemplateType),
  estateUnit: null,
  facilityContract: null,
  ticketChecklistId: null,
});

export const getEmptyTicketChecklistsFormInput = (): TicketChecklistsFormInput => ({
  catalogueTypes: {},
  estateUnits: [],
  ticketChecklistTemplates: [],
});
