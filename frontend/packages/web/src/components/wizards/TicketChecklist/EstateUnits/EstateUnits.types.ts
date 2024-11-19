import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { TicketChecklistsFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistsEstateUnitsStepProps {
  estateUnits: EstateUnitFragment[];
  ticketChecklists: TicketChecklistsFormInput;
  onChange: (ticketChecklists: TicketChecklistsFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
