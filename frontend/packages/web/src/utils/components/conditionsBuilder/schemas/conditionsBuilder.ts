import { ComparisonOperator, PenaltyType } from '@realgimm5/frontend-common/gql/types';
import {
  getNumberNotGreaterTranslation,
  getNumberNotLesserTranslation,
  getPercentMaxTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { Schema, array, lazy, number, object, ref, string } from 'yup';

import { ConditionType } from '../../../../enums/ConditionType';
import { ConditionFormInput } from '../../../../interfaces/FormInputs/ConditionsBuilder';
import { isGroupConditionsFormInput } from '../../../typeNarrowings/isGroupConditions';

const getConditionSchema = (t: TFunction) =>
  object().shape(
    {
      conditionType: string().required(getRequiredTranslation('component.conditions_builder.field.condition', t)),
      operator: string()
        .nullable()
        .when('conditionType', {
          is: (conditionType: ConditionType) => conditionType !== ConditionType.PenaltyType,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.operator', t)),
        }),
      catalogueCategory: object()
        .nullable()
        .when('conditionType', {
          is: ConditionType.CatalogueCategory,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.value', t)),
        }),
      catalogueSubCategory: object()
        .nullable()
        .when('conditionType', {
          is: ConditionType.CatalogueSubCategory,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.value', t)),
        }),
      catalogueType: object()
        .nullable()
        .when('conditionType', {
          is: ConditionType.CatalogueType,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.value', t)),
        }),
      penaltyType: string()
        .nullable()
        .when('conditionType', {
          is: ConditionType.PenaltyType,
          then: (schema) =>
            schema.required(getRequiredTranslation('component.conditions_builder.field.penalty_type', t)),
        }),
      penaltyValue: number()
        .nullable()
        .when(['conditionType', 'penaltyType'], ([conditionType, penaltyType], schema) => {
          if (conditionType !== ConditionType.PenaltyType) return schema;

          const baseSchema = schema.required(
            getRequiredTranslation('component.conditions_builder.field.penalty_value', t),
          );

          if (penaltyType === PenaltyType.Fixed) return baseSchema;

          return baseSchema.max(100, getPercentMaxTranslation('component.conditions_builder.field.penalty_value', t));
        }),
      priority: string()
        .nullable()
        .when('conditionType', {
          is: ConditionType.Priority,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.value', t)),
        }),
      masterStatus: string()
        .nullable()
        .when('conditionType', {
          is: ConditionType.TicketMasterStatus,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.calendar', t)),
        }),
      calendar: object()
        .nullable()
        .when('conditionType', {
          is: ConditionType.TicketMasterStatus,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.calendar', t)),
        }),
      minTimePeriodInMinutes: number()
        .nullable()
        .when(['conditionType', 'operator'], ([conditionType, operator], schema) => {
          if (conditionType !== ConditionType.TicketMasterStatus || operator === ComparisonOperator.LessThan)
            return schema;

          const baseSchema = schema.required(getRequiredTranslation('component.conditions_builder.field.value_min', t));
          if (operator === ComparisonOperator.GreaterThan) return baseSchema;
          return baseSchema.max(
            ref('maxTimePeriodInMinutes'),
            getNumberNotGreaterTranslation(
              'component.conditions_builder.field.value_min',
              'component.conditions_builder.field.value_max',
              t,
            ),
          );
        }),
      maxTimePeriodInMinutes: number()
        .nullable()
        .when(['conditionType', 'operator'], ([conditionType, operator], schema) => {
          if (conditionType !== ConditionType.TicketMasterStatus || operator === ComparisonOperator.GreaterThan)
            return schema;

          const baseSchema = schema.required(getRequiredTranslation('component.conditions_builder.field.value_max', t));
          if (operator === ComparisonOperator.LessThan) return baseSchema;
          return baseSchema.min(
            ref('minTimePeriodInMinutes'),
            getNumberNotLesserTranslation(
              'component.conditions_builder.field.value_max',
              'component.conditions_builder.field.value_min',
              t,
            ),
          );
        }),
      ticketType: object()
        .nullable()
        .when('conditionType', {
          is: ConditionType.TicketType,
          then: (schema) => schema.required(getRequiredTranslation('component.conditions_builder.field.value', t)),
        }),
    },
    [['maxTimePeriodInHours', 'minTimePeriodInHours']],
  );

const getGroupConditionsSchema = (t: TFunction) =>
  object().shape({
    conditions: array()
      .min(1, t('component.conditions_builder.error.no_conditions'))
      .of(
        lazy(
          (value: ConditionFormInput): Schema =>
            isGroupConditionsFormInput(value) ? getGroupConditionsSchema(t) : getConditionSchema(t),
        ),
      ),
  });

export const getConditionsBuilderSchema = (t: TFunction) =>
  object().shape({
    ifCondition: getGroupConditionsSchema(t),
    thenCondition: getGroupConditionsSchema(t),
  });
