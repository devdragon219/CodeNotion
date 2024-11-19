import { TicketTypeInput } from '@realgimm5/frontend-common/gql/types';

import { TicketTypeFormInput } from '../../interfaces/FormInputs/TicketType';

export const parseTicketTypeFormInputToTicketTypeInput = (ticketType: TicketTypeFormInput): TicketTypeInput => ({
  description: ticketType.description,
  internalCode: ticketType.internalCode,
  ordering: ticketType.ordering,
});
