import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';

import { TicketChecklistTemplateFormInput } from '../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateCreateDialogProps {
  ticketChecklistTemplateType: TicketChecklistTemplateType;
  onClose: () => void;
  onSave: (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => void;
}
