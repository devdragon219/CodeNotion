import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { RepeatableField, SelectField } from '@realgimm5/frontend-common/components';
import { BooleanOperator } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ConditionType } from '../../../../../enums/ConditionType';
import { ConditionFormInput, GroupConditionsFormInput } from '../../../../../interfaces/FormInputs/ConditionsBuilder';
import {
  getEmptyConditionFormInput,
  getEmptyGroupConditionsFormInput,
} from '../../../../../utils/components/conditionsBuilder/initialValues';
import { isGroupConditionsFormInput } from '../../../../../utils/typeNarrowings/isGroupConditions';
import { ConditionField } from '../Condition/Condition';
import { GroupConditionsFieldProps } from './GroupConditions.types';

const OperatorDivider = () => (
  <Divider
    orientation="vertical"
    sx={(theme) => ({
      height: 'auto',
      flex: 1,
      margin: 'auto',
      borderRightWidth: '3px',
      borderRightColor: theme.palette.grey[700],
    })}
  />
);

export const GroupConditionsField = ({
  conditionTypes,
  disabled,
  errors,
  groupConditions,
  inner,
  readonly,
  onChange,
}: GroupConditionsFieldProps) => {
  const { t } = useTranslation();

  const isPenalty = useMemo(
    () => conditionTypes.length === 1 && conditionTypes[0] === ConditionType.PenaltyType,
    [conditionTypes],
  );

  const handleOperatorChange = useCallback(
    (operator: BooleanOperator | null) => {
      const propagateOperatorChange = (
        groupConditions: GroupConditionsFormInput,
        operator: BooleanOperator,
      ): GroupConditionsFormInput => ({
        ...groupConditions,
        operator,
        conditions: groupConditions.conditions.map((condition) =>
          isGroupConditionsFormInput(condition)
            ? propagateOperatorChange(
                condition,
                operator === BooleanOperator.And ? BooleanOperator.Or : BooleanOperator.And,
              )
            : condition,
        ),
      });

      onChange(propagateOperatorChange(groupConditions, operator!));
    },
    [groupConditions, onChange],
  );

  const handleConditionChange = useCallback(
    (index: number) => (condition: GroupConditionsFormInput | ConditionFormInput) => {
      onChange({
        ...groupConditions,
        conditions: groupConditions.conditions.map((it, idx) => (idx === index ? condition : it)),
      });
    },
    [groupConditions, onChange],
  );

  const handleRemoveCondition = useCallback(
    (index: number) => {
      if (
        disabled ||
        readonly ||
        (inner && groupConditions.conditions.length <= 2) ||
        (!inner && groupConditions.conditions.length <= 1)
      )
        return undefined;

      return () => {
        onChange({
          ...groupConditions,
          conditions: groupConditions.conditions.filter((_, idx) => idx !== index),
        });
      };
    },
    [disabled, readonly, inner, groupConditions, onChange],
  );

  const handleAddCondition = useCallback(() => {
    onChange({
      ...groupConditions,
      conditions: [
        ...groupConditions.conditions,
        getEmptyConditionFormInput(isPenalty ? ConditionType.PenaltyType : null),
      ],
    });
  }, [onChange, groupConditions, isPenalty]);

  const handleAddInnerCondition = useCallback(() => {
    onChange({
      ...groupConditions,
      conditions: [
        ...groupConditions.conditions,
        getEmptyGroupConditionsFormInput(
          [
            getEmptyConditionFormInput(isPenalty ? ConditionType.PenaltyType : null),
            getEmptyConditionFormInput(isPenalty ? ConditionType.PenaltyType : null),
          ],
          groupConditions.operator === BooleanOperator.And ? BooleanOperator.Or : BooleanOperator.And,
        ),
      ],
    });
  }, [onChange, groupConditions, isPenalty]);

  return (
    <Stack direction="column" spacing={{ xs: 2, sm: 3 }}>
      {errors?.conditions?.message && (
        <Typography sx={(theme) => ({ color: theme.palette.danger[300] })} variant="bodySm">
          {errors.conditions.message}
        </Typography>
      )}
      {groupConditions.conditions.length !== 0 && (
        <Stack direction="row" spacing={{ xs: 2, sm: 3 }}>
          <Stack spacing={1} useFlexGap>
            <OperatorDivider />
            {groupConditions.conditions.length > 1 && (
              <>
                <SelectField
                  options={Object.values(BooleanOperator)}
                  getOptionLabel={(option) => t(`common.enum.boolean_operator.${option}`)}
                  value={groupConditions.operator}
                  onChange={handleOperatorChange}
                  disabled={disabled || inner}
                  readonly={readonly}
                />
                <OperatorDivider />
              </>
            )}
          </Stack>
          <Stack direction="column" spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%' }}>
            {groupConditions.conditions.map((condition, index) => (
              <RepeatableField
                key={index}
                iconPositionAbsolute={false}
                index={index}
                onDelete={handleRemoveCondition(index)}
              >
                {isGroupConditionsFormInput(condition) ? (
                  <GroupConditionsField
                    conditionTypes={conditionTypes}
                    disabled={disabled}
                    errors={errors?.conditions?.[index]}
                    groupConditions={condition}
                    inner
                    readonly={readonly}
                    onChange={handleConditionChange(index)}
                  />
                ) : (
                  <ConditionField
                    condition={condition}
                    conditionTypes={conditionTypes}
                    disabled={disabled}
                    errors={errors?.conditions?.[index]}
                    readonly={readonly}
                    onChange={handleConditionChange(index)}
                  />
                )}
              </RepeatableField>
            ))}
          </Stack>
        </Stack>
      )}
      {!disabled && !readonly && (
        <Stack direction="row" spacing={1}>
          <Button color="tertiary" variant="outlined" startIcon={<AddCircleOutline />} onClick={handleAddCondition}>
            {t(`component.conditions_builder.action.add_${isPenalty ? 'penalty' : 'condition'}`)}
          </Button>
          {!isPenalty && (
            <Button
              color="tertiary"
              variant="outlined"
              startIcon={<AddCircleOutline />}
              onClick={handleAddInnerCondition}
            >
              {t('component.conditions_builder.action.add_inner_condition')}
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};
