import { TicketChecklistTemplateDetailFragment } from '../../gql/RealGimm.Web.TicketChecklistTemplate.fragment';
import { TicketChecklistTemplateFormInput } from '../../interfaces/FormInputs/TicketChecklistTemplate';
import {
  parseCatalogueCategoryToCatalogueCategoryFormInput,
  parseCatalogueSubCategoryToCatalogueSubCategoryFormInput,
} from '../catalogueCategory/parseCatalogueCategoryFragment';
import {
  parseCatalogueTypeActivityToCatalogueTypeActivityFormInput,
  parseCatalogueTypeToCatalogueTypeFormInput,
} from '../catalogueType/parseCatalogueTypeFragment';

export const parseTicketChecklistTemplateToTicketChecklistTemplateFormInput = (
  ticketChecklistTemplate: TicketChecklistTemplateDetailFragment,
): TicketChecklistTemplateFormInput => ({
  catalogueCategory: parseCatalogueCategoryToCatalogueCategoryFormInput(ticketChecklistTemplate.catalogueType.category),
  catalogueSubCategory: parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(
    ticketChecklistTemplate.catalogueType.subCategory!,
  ),
  catalogueType: parseCatalogueTypeToCatalogueTypeFormInput(ticketChecklistTemplate.catalogueType),
  costBaseFactor: ticketChecklistTemplate.costBaseFactor,
  internalCode: ticketChecklistTemplate.internalCode,
  name: ticketChecklistTemplate.name,
  onCondition: {
    activities:
      ticketChecklistTemplate.onTriggerActivities?.map(parseCatalogueTypeActivityToCatalogueTypeActivityFormInput) ??
      [],
    craft: ticketChecklistTemplate.onTriggerCraft ?? null,
    interventionType: ticketChecklistTemplate.onTriggerInterventionType ?? null,
  },
  preventative: {
    activities:
      ticketChecklistTemplate.preventativeActivities?.map(parseCatalogueTypeActivityToCatalogueTypeActivityFormInput) ??
      [],
    craft: ticketChecklistTemplate.preventativeCraft ?? null,
    daysOfWeek: ticketChecklistTemplate.preventativeDaysOfWeek ?? [],
    interventionType: ticketChecklistTemplate.preventativeInterventionType ?? null,
    plannedPeriod: ticketChecklistTemplate.preventativePlannedPeriod ?? null,
    toleranceDays: ticketChecklistTemplate.preventativeToleranceDays ?? null,
  },
  rawWorkCost: ticketChecklistTemplate.rawWorkCost,
  safetyCost: ticketChecklistTemplate.safetyCost,
  ticketChecklistTemplateId: ticketChecklistTemplate.id,
  ticketChecklistTemplateType: ticketChecklistTemplate.type,
});
