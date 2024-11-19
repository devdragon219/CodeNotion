import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateRecapStepProps {
  ticketChecklistTemplate: TicketChecklistTemplateFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => void;
}
