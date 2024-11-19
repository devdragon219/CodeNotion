import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { FacilityContractFragment } from '../../gql/RealGimm.Web.FacilityContract.fragment';
import { TicketChecklistFragment } from '../../gql/RealGimm.Web.TicketChecklist.fragment';
import { TicketChecklistTemplateFragment } from '../../gql/RealGimm.Web.TicketChecklistTemplate.fragment';
import { TicketChecklistTemplateFormInput } from './TicketChecklistTemplate';

export interface TicketChecklistFormInput extends Omit<TicketChecklistTemplateFormInput, 'ticketChecklistTemplateId'> {
  estateUnit: EstateUnitFragment | null;
  facilityContract: FacilityContractFragment | null;
  ticketChecklistId: number | null;
}

export interface TicketChecklistsFormInput {
  catalogueTypes: Partial<{
    [catalogueTypeId: number]: number[];
  }>;
  estateUnits: EstateUnitFragment[];
  ticketChecklistTemplates: TicketChecklistTemplateFragment[];
}

type TicketChecklist = Omit<TicketChecklistFragment, '__typename' | 'estateUnit'>;
export type GroupedTicketChecklistRow = Partial<TicketChecklist> & {
  estateUnit?: EstateUnitFragment;
  ticketChecklists?: GroupedTicketChecklistRow[];
};
