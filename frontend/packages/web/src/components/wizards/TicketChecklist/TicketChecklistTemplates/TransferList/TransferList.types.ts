import { Control } from 'react-hook-form';

import { TicketChecklistsFormInput } from '../../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistTemplatesTransferListProps {
  catalogueTypeIds: number[];
  control: Control<TicketChecklistsFormInput>;
}
