import { FormMode } from '@realgimm5/frontend-common/enums';
import { ComplexTicketConditionInput, OneOfTicketConditionInput } from '@realgimm5/frontend-common/gql/types';

import { ConditionType } from '../../../enums/ConditionType';
import { GroupConditionsFormInput } from '../../../interfaces/FormInputs/ConditionsBuilder';
import { isGroupConditionsFormInput } from '../../typeNarrowings/isGroupConditions';

export const parseGroupConditionsFormInputToConditionsInput = (
  conditions: GroupConditionsFormInput,
  mode: FormMode,
): ComplexTicketConditionInput => ({
  id: mode === FormMode.Create ? undefined : conditions.groupConditionId,
  internalConditions: conditions.conditions.reduce<OneOfTicketConditionInput[]>((acc, condition) => {
    if (isGroupConditionsFormInput(condition)) {
      return [
        ...acc,
        {
          complex: parseGroupConditionsFormInputToConditionsInput(condition, mode),
        },
      ];
    }

    const conditionId = mode === FormMode.Create ? undefined : condition.conditionId;
    switch (condition.conditionType) {
      case ConditionType.CatalogueCategory:
        return [
          ...acc,
          {
            catalogueCategoryEquality: {
              id: conditionId,
              operator: condition.operator!,
              targetCatalogueCategoryId: condition.catalogueCategory!.categoryId!,
            },
          },
        ];
      case ConditionType.CatalogueSubCategory:
        return [
          ...acc,
          {
            catalogueSubCategoryEquality: {
              id: conditionId,
              operator: condition.operator!,
              targetCatalogueSubCategoryId: condition.catalogueSubCategory!.subCategoryId!,
            },
          },
        ];
      case ConditionType.CatalogueType:
        return [
          ...acc,
          {
            catalogueTypeEquality: {
              id: conditionId,
              operator: condition.operator!,
              targetCatalogueTypeId: condition.catalogueType!.catalogueTypeId!,
            },
          },
        ];
      case ConditionType.Priority:
        return [
          ...acc,
          {
            priorityEquality: {
              id: conditionId,
              operator: condition.operator!,
              targetPriority: condition.priority!,
            },
          },
        ];
      case ConditionType.TicketMasterStatus:
        return [
          ...acc,
          {
            masterStatus: {
              calendarId: condition.calendar!.id,
              id: conditionId,
              maxTimePeriodInMinutes: condition.maxTimePeriodInMinutes,
              minTimePeriodInMinutes: condition.minTimePeriodInMinutes,
              targetMasterStatus: condition.masterStatus!,
              timeComparisonOperator: condition.operator!,
            },
          },
        ];
      case ConditionType.TicketType:
        return [
          ...acc,
          {
            ticketTypeEquality: {
              id: conditionId,
              operator: condition.operator!,
              targetTicketTypeId: condition.ticketType!.id,
            },
          },
        ];
      default:
        return acc;
    }
  }, []),
  operator: conditions.operator,
});
