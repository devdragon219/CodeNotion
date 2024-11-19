import { Control } from 'react-hook-form';

import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { TicketChecklistsFormInput } from '../../../../../interfaces/FormInputs/TicketChecklist';

export interface EstateUnitsTransferListProps {
  control: Control<TicketChecklistsFormInput>;
  estateUnits: EstateUnitFragment[];
}
