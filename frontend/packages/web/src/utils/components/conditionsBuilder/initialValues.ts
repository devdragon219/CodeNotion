import { BooleanOperator } from '@realgimm5/frontend-common/gql/types';

import { ConditionType } from '../../../enums/ConditionType';
import {
  BaseConditionFormInput,
  CatalogueCategoryConditionFormInput,
  CatalogueSubCategoryConditionFormInput,
  CatalogueTypeConditionFormInput,
  ConditionFormInput,
  ConditionsBuilderFormInput,
  GroupConditionsFormInput,
  PenaltyTypeConditionFormInput,
  PriorityConditionFormInput,
  TicketMasterStatusConditionFormInput,
  TicketTypeConditionFormInput,
} from '../../../interfaces/FormInputs/ConditionsBuilder';

export const getEmptyBaseConditionFormInput = (): BaseConditionFormInput => ({
  conditionId: null,
  conditionType: null,
});

export const getEmptyCatalogueCategoryConditionFormInput = (): CatalogueCategoryConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.CatalogueCategory,
  catalogueCategory: null,
  operator: null,
});

export const getEmptyCatalogueSubCategoryConditionFormInput = (): CatalogueSubCategoryConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.CatalogueSubCategory,
  catalogueSubCategory: null,
  operator: null,
});

export const getEmptyCatalogueTypeConditionFormInput = (): CatalogueTypeConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.CatalogueType,
  catalogueType: null,
  operator: null,
});

export const getEmptyPenaltyTypeConditionFormInput = (): PenaltyTypeConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.PenaltyType,
  penaltyType: null,
  penaltyValue: null,
});

export const getEmptyPriorityConditionFormInput = (): PriorityConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.Priority,
  operator: null,
  priority: null,
});

export const getEmptyTicketMasterStatusConditionFormInput = (): TicketMasterStatusConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.TicketMasterStatus,
  calendar: null,
  masterStatus: null,
  maxTimePeriodInMinutes: null,
  minTimePeriodInMinutes: null,
  operator: null,
});

export const getEmptyTicketTypeConditionFormInput = (): TicketTypeConditionFormInput => ({
  conditionId: null,
  conditionType: ConditionType.TicketType,
  operator: null,
  ticketType: null,
});

export const getEmptyConditionFormInput = (type: ConditionType | null) => {
  switch (type) {
    case ConditionType.CatalogueCategory:
      return getEmptyCatalogueCategoryConditionFormInput();
    case ConditionType.CatalogueSubCategory:
      return getEmptyCatalogueSubCategoryConditionFormInput();
    case ConditionType.CatalogueType:
      return getEmptyCatalogueTypeConditionFormInput();
    case ConditionType.PenaltyType:
      return getEmptyPenaltyTypeConditionFormInput();
    case ConditionType.Priority:
      return getEmptyPriorityConditionFormInput();
    case ConditionType.TicketMasterStatus:
      return getEmptyTicketMasterStatusConditionFormInput();
    case ConditionType.TicketType:
      return getEmptyTicketTypeConditionFormInput();
    default:
      return getEmptyBaseConditionFormInput();
  }
};

export const getEmptyGroupConditionsFormInput = (
  conditions: ConditionFormInput[] = [],
  operator: BooleanOperator = BooleanOperator.And,
): GroupConditionsFormInput => ({
  conditions,
  groupConditionId: null,
  operator,
});

export const getEmptyConditionsBuilderFormInput = (
  ifConditionType: ConditionType | null = null,
  thenConditionType: ConditionType | null = null,
): ConditionsBuilderFormInput => ({
  ifCondition: getEmptyGroupConditionsFormInput([getEmptyConditionFormInput(ifConditionType)]),
  thenCondition: getEmptyGroupConditionsFormInput([getEmptyConditionFormInput(thenConditionType)]),
});
