import { TicketTypeFormInput } from '../../interfaces/FormInputs/TicketType';

export const getEmptyTicketTypeFormInput = (): TicketTypeFormInput => ({
  description: '',
  internalCode: '',
  ordering: 0,
  ticketTypeId: null,
});
