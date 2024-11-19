import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateCostsStepProps {
  ticketChecklistTemplate: TicketChecklistTemplateFormInput;
  onBack: () => void;
  onChange: (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
