import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateOnConditionMaintenanceFieldsSubStepProps {
  ticketChecklistTemplate: TicketChecklistTemplateFormInput;
  onBack: () => void;
  onChange: (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
