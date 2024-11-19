import { ConditionType } from '../../../enums/ConditionType';
import {
  ComplexTicketConditionFragment,
  TicketConditionFragment,
} from '../../../gql/RealGimm.Web.TicketCondition.fragment';
import { GroupConditionsFormInput } from '../../../interfaces/FormInputs/ConditionsBuilder';
import {
  parseCatalogueCategoryToCatalogueCategoryFormInput,
  parseCatalogueSubCategoryToCatalogueSubCategoryFormInput,
} from '../../catalogueCategory/parseCatalogueCategoryFragment';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../../catalogueType/parseCatalogueTypeFragment';

export const parseConditionsFragmentToGroupConditionsFormInput = (
  conditions: TicketConditionFragment[],
  groupId: number,
): GroupConditionsFormInput => {
  const condition = conditions.find(({ id }) => id === groupId) as ComplexTicketConditionFragment;

  return {
    conditions: condition.internalConditions.map((it) => {
      const condition = conditions.find(({ id }) => id === it.id)!;
      if ('booleanOperator' in condition) return parseConditionsFragmentToGroupConditionsFormInput(conditions, it.id);

      switch (condition.__typename) {
        case 'TicketCatalogueCategoryEqualityCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.CatalogueCategory,
            operator: condition.equalityOperator,
            catalogueCategory: parseCatalogueCategoryToCatalogueCategoryFormInput(condition.targetCatalogueCategory),
          };
        case 'TicketCatalogueSubCategoryEqualityCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.CatalogueSubCategory,
            operator: condition.equalityOperator,
            catalogueSubCategory: parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(
              condition.targetCatalogueSubCategory,
            ),
          };
        case 'TicketCatalogueTypeEqualityCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.CatalogueType,
            operator: condition.equalityOperator,
            catalogueType: parseCatalogueTypeToCatalogueTypeFormInput(condition.targetCatalogueType),
          };
        case 'TicketMasterStatusCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.TicketMasterStatus,
            calendar: condition.calendar,
            masterStatus: condition.targetMasterStatus,
            maxTimePeriodInMinutes: condition.maxTimePeriodInMinutes ?? null,
            minTimePeriodInMinutes: condition.minTimePeriodInMinutes ?? null,
            operator: condition.comparisonOperator,
          };
        case 'TicketPriorityEqualityCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.Priority,
            operator: condition.equalityOperator,
            priority: condition.targetPriority,
          };
        case 'TicketTypeEqualityCondition':
          return {
            conditionId: condition.id,
            conditionType: ConditionType.TicketType,
            operator: condition.equalityOperator,
            ticketType: condition.targetTicketType,
          };
      }
    }),
    groupConditionId: groupId,
    operator: condition.booleanOperator,
  };
};
