import {
  CostBaseFactor,
  DayOfWeek,
  PlannedPeriod,
  TicketChecklistTemplateType,
} from '@realgimm5/frontend-common/gql/types';

import { CraftFieldValue } from '../FieldValues/Craft';
import { InterventionTypeFieldValue } from '../FieldValues/InterventionType';
import { CatalogueCategoryFormInput, CatalogueSubCategoryFormInput } from './CatalogueCategory';
import { CatalogueTypeActivityFormInput, CatalogueTypeFormInput } from './CatalogueType';

export interface TicketChecklistTemplateOnConditionMaintenanceFormInput {
  activities: CatalogueTypeActivityFormInput[];
  craft: CraftFieldValue | null;
  interventionType: InterventionTypeFieldValue | null;
}

export interface TicketChecklistTemplatePreventativeMaintenanceFormInput {
  activities: CatalogueTypeActivityFormInput[];
  craft: CraftFieldValue | null;
  daysOfWeek: DayOfWeek[];
  interventionType: InterventionTypeFieldValue | null;
  plannedPeriod: PlannedPeriod | null;
  toleranceDays: number | null;
}

export interface TicketChecklistTemplateFormInput {
  catalogueCategory: CatalogueCategoryFormInput | null;
  catalogueSubCategory: CatalogueSubCategoryFormInput | null;
  catalogueType: CatalogueTypeFormInput | null;
  costBaseFactor: CostBaseFactor | null;
  internalCode: string;
  name: string;
  onCondition: TicketChecklistTemplateOnConditionMaintenanceFormInput;
  preventative: TicketChecklistTemplatePreventativeMaintenanceFormInput;
  rawWorkCost: number | null;
  safetyCost: number | null;
  ticketChecklistTemplateId: number | null;
  ticketChecklistTemplateType: TicketChecklistTemplateType | null;
}
