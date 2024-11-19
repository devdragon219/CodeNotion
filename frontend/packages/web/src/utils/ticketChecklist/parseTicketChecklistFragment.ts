import { TicketChecklistDetailFragment } from '../../gql/RealGimm.Web.TicketChecklist.fragment';
import { TicketChecklistTemplateDetailFragment } from '../../gql/RealGimm.Web.TicketChecklistTemplate.fragment';
import { TicketChecklistFormInput } from '../../interfaces/FormInputs/TicketChecklist';
import { parseTicketChecklistTemplateToTicketChecklistTemplateFormInput } from '../ticketChecklistTemplate/parseTicketChecklistTemplateFragment';

export const parseTicketChecklistToTicketChecklistFormInput = (
  ticketChecklist: TicketChecklistDetailFragment,
): TicketChecklistFormInput => ({
  ...parseTicketChecklistTemplateToTicketChecklistTemplateFormInput(
    ticketChecklist as TicketChecklistTemplateDetailFragment,
  ),
  estateUnit: ticketChecklist.estateUnit,
  facilityContract: ticketChecklist.contract,
  ticketChecklistId: ticketChecklist.id,
});
