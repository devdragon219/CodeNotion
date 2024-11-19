import { TicketTypeFragment } from '../../gql/RealGimm.Web.TicketType.fragment';
import { TicketTypeFormInput } from '../../interfaces/FormInputs/TicketType';

export const parseTicketTypeToTicketTypeFormInput = (ticketType: TicketTypeFragment): TicketTypeFormInput => ({
  description: ticketType.description,
  internalCode: ticketType.internalCode,
  ordering: ticketType.ordering,
  ticketTypeId: ticketType.id,
});
