import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateGeneralDataStepProps {
  canUseInternalCode: boolean;
  ticketChecklistTemplate: TicketChecklistTemplateFormInput;
  onChange: (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
