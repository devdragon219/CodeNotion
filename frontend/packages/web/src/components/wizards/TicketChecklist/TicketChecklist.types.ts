import { EstateUnitFragment } from '../../../gql/RealGimm.Web.EstateUnit.fragment';
import { TicketChecklistsFormInput } from '../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistCreateDialogProps {
  estateUnits: EstateUnitFragment[];
  onClose: () => void;
  onSave: (ticketChecklists: TicketChecklistsFormInput) => void;
}
