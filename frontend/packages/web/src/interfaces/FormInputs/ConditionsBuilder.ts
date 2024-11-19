import {
  BooleanOperator,
  ComparisonOperator,
  EqualityOperator,
  PenaltyType,
  Priority,
  TicketMasterStatus,
} from '@realgimm5/frontend-common/gql/types';

import { ConditionType } from '../../enums/ConditionType';
import { CalendarFieldValue } from '../FieldValues/Calendar';
import { TicketTypeFieldValue } from '../FieldValues/TicketType';
import { CatalogueCategoryFormInput, CatalogueSubCategoryFormInput } from './CatalogueCategory';
import { CatalogueTypeFormInput } from './CatalogueType';

export interface BaseConditionFormInput {
  conditionId: number | null;
  conditionType: null;
}

export interface CatalogueCategoryConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.CatalogueCategory;
  catalogueCategory: CatalogueCategoryFormInput | null;
  operator: EqualityOperator | null;
}

export interface CatalogueSubCategoryConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.CatalogueSubCategory;
  catalogueSubCategory: CatalogueSubCategoryFormInput | null;
  operator: EqualityOperator | null;
}

export interface CatalogueTypeConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.CatalogueType;
  catalogueType: CatalogueTypeFormInput | null;
  operator: EqualityOperator | null;
}

export interface PenaltyTypeConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.PenaltyType;
  penaltyType: PenaltyType | null;
  penaltyValue: number | null;
}

export interface PriorityConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.Priority;
  operator: EqualityOperator | null;
  priority: Priority | null;
}

export interface TicketMasterStatusConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.TicketMasterStatus;
  calendar: CalendarFieldValue | null;
  masterStatus: TicketMasterStatus | null;
  maxTimePeriodInMinutes: number | null;
  minTimePeriodInMinutes: number | null;
  operator: ComparisonOperator | null;
}

export interface TicketTypeConditionFormInput extends Omit<BaseConditionFormInput, 'conditionType'> {
  conditionType: ConditionType.TicketType;
  operator: EqualityOperator | null;
  ticketType: TicketTypeFieldValue | null;
}

export type ConditionFormInput =
  | BaseConditionFormInput
  | CatalogueCategoryConditionFormInput
  | CatalogueSubCategoryConditionFormInput
  | CatalogueTypeConditionFormInput
  | PenaltyTypeConditionFormInput
  | PriorityConditionFormInput
  | TicketMasterStatusConditionFormInput
  | TicketTypeConditionFormInput;

export interface GroupConditionsFormInput {
  conditions: (ConditionFormInput | GroupConditionsFormInput)[];
  groupConditionId: number | null;
  operator: BooleanOperator;
}

export interface ConditionsBuilderFormInput {
  ifCondition: GroupConditionsFormInput;
  thenCondition: GroupConditionsFormInput;
}
