import { Stack } from '@mui/material';
import { CurrencyField, DurationField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { ComparisonOperator, EqualityOperator, PenaltyType } from '@realgimm5/frontend-common/gql/types';
import { KeysOf } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SORTED_PRIORITIES } from '../../../../../configs/priority';
import { SORTED_TICKET_MASTER_STATUSES } from '../../../../../configs/ticket';
import { ConditionType } from '../../../../../enums/ConditionType';
import {
  CatalogueCategoryConditionFormInput,
  CatalogueSubCategoryConditionFormInput,
  CatalogueTypeConditionFormInput,
  ConditionFormInput,
  PenaltyTypeConditionFormInput,
  PriorityConditionFormInput,
  TicketMasterStatusConditionFormInput,
  TicketTypeConditionFormInput,
} from '../../../../../interfaces/FormInputs/ConditionsBuilder';
import { getEmptyConditionFormInput } from '../../../../../utils/components/conditionsBuilder/initialValues';
import { CalendarField } from '../../../Fields/Calendar/Calendar';
import { CatalogueCategoryField } from '../../../Fields/CatalogueCategory/CatalogueCategory';
import { CatalogueSubCategoryField } from '../../../Fields/CatalogueSubCategory/CatalogueSubCategory';
import { CatalogueTypeField } from '../../../Fields/CatalogueType/CatalogueType';
import { TicketTypeField } from '../../../Fields/TicketType/TicketType';
import { ConditionFieldProps } from './Condition.types';

export const ConditionField = ({
  condition,
  conditionTypes,
  disabled,
  errors,
  readonly,
  onChange,
}: ConditionFieldProps) => {
  const { t } = useTranslation();

  const commonProps = useMemo(
    () => ({
      sx: { flex: 1 },
      required: true,
      disabled,
      readonly,
    }),
    [disabled, readonly],
  );

  const handleConditionTypeChange = useCallback(
    (type: ConditionType | null) => {
      onChange(getEmptyConditionFormInput(type));
    },
    [onChange],
  );

  const handleChange = useCallback(
    (key: KeysOf<ConditionFormInput>) => (value: unknown) => {
      onChange({
        ...condition,
        [key]: value,
      });
    },
    [condition, onChange],
  );

  const inputs = useMemo(() => {
    switch (condition.conditionType) {
      case ConditionType.CatalogueCategory: {
        const conditionErrors = errors as FieldErrors<CatalogueCategoryConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(EqualityOperator)}
              getOptionLabel={(option) => t(`common.enum.equality_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            <CatalogueCategoryField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              error={!!conditionErrors?.catalogueCategory}
              helperText={conditionErrors?.catalogueCategory?.message}
              value={condition.catalogueCategory}
              onChange={handleChange('catalogueCategory')}
            />
          </>
        );
      }
      case ConditionType.CatalogueSubCategory: {
        const conditionErrors = errors as FieldErrors<CatalogueSubCategoryConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(EqualityOperator)}
              getOptionLabel={(option) => t(`common.enum.equality_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            <CatalogueSubCategoryField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              error={!!conditionErrors?.catalogueSubCategory}
              helperText={conditionErrors?.catalogueSubCategory?.message}
              value={condition.catalogueSubCategory}
              onChange={handleChange('catalogueSubCategory')}
            />
          </>
        );
      }
      case ConditionType.CatalogueType: {
        const conditionErrors = errors as FieldErrors<CatalogueTypeConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(EqualityOperator)}
              getOptionLabel={(option) => t(`common.enum.equality_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            <CatalogueTypeField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              error={!!conditionErrors?.catalogueType}
              helperText={conditionErrors?.catalogueType?.message}
              value={condition.catalogueType}
              onChange={handleChange('catalogueType')}
            />
          </>
        );
      }
      case ConditionType.PenaltyType: {
        const conditionErrors = errors as FieldErrors<PenaltyTypeConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.penalty_type')}
              options={Object.values(PenaltyType)}
              getOptionLabel={(option) => t(`common.enum.penalty_type.${option}`)}
              error={!!conditionErrors?.penaltyType}
              helperText={conditionErrors?.penaltyType?.message}
              value={condition.penaltyType}
              onChange={handleChange('penaltyType')}
            />
            {condition.penaltyType === PenaltyType.Fixed ? (
              <CurrencyField
                {...commonProps}
                label={t('component.conditions_builder.field.penalty_value')}
                error={!!conditionErrors?.penaltyValue}
                helperText={conditionErrors?.penaltyValue?.message}
                value={condition.penaltyValue}
                onChange={handleChange('penaltyValue')}
              />
            ) : (
              <TextField
                {...commonProps}
                type="number"
                maxLength={3}
                label={t('component.conditions_builder.field.penalty_value')}
                error={!!conditionErrors?.penaltyValue}
                helperText={conditionErrors?.penaltyValue?.message}
                value={condition.penaltyValue}
                onChange={handleChange('penaltyValue')}
              />
            )}
          </>
        );
      }
      case ConditionType.Priority: {
        const conditionErrors = errors as FieldErrors<PriorityConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(EqualityOperator)}
              getOptionLabel={(option) => t(`common.enum.equality_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              options={SORTED_PRIORITIES}
              getOptionLabel={(option) => t(`common.enum.priority.${option}`)}
              useSortedOptions={false}
              error={!!conditionErrors?.priority}
              helperText={conditionErrors?.priority?.message}
              value={condition.priority}
              onChange={handleChange('priority')}
            />
          </>
        );
      }
      case ConditionType.TicketMasterStatus: {
        const conditionErrors = errors as FieldErrors<TicketMasterStatusConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              options={SORTED_TICKET_MASTER_STATUSES}
              getOptionLabel={(option) => t(`common.enum.ticket_master_status.${option}`)}
              useSortedOptions={false}
              error={!!conditionErrors?.masterStatus}
              helperText={conditionErrors?.masterStatus?.message}
              value={condition.masterStatus}
              onChange={handleChange('masterStatus')}
            />
            <CalendarField
              {...commonProps}
              label={t('component.conditions_builder.field.calendar')}
              error={!!conditionErrors?.calendar}
              helperText={conditionErrors?.calendar?.message}
              value={condition.calendar}
              onChange={handleChange('calendar')}
            />
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(ComparisonOperator)}
              getOptionLabel={(option) => t(`common.enum.comparison_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            {condition.operator !== ComparisonOperator.LessThan && (
              <DurationField
                {...commonProps}
                label={t('component.conditions_builder.field.value_min')}
                error={!!conditionErrors?.minTimePeriodInMinutes}
                helperText={conditionErrors?.minTimePeriodInMinutes?.message}
                value={condition.minTimePeriodInMinutes}
                onChange={handleChange('minTimePeriodInMinutes')}
              />
            )}
            {condition.operator !== ComparisonOperator.GreaterThan && (
              <DurationField
                {...commonProps}
                label={t('component.conditions_builder.field.value_max')}
                error={!!conditionErrors?.maxTimePeriodInMinutes}
                helperText={conditionErrors?.maxTimePeriodInMinutes?.message}
                value={condition.maxTimePeriodInMinutes}
                onChange={handleChange('maxTimePeriodInMinutes')}
              />
            )}
          </>
        );
      }
      case ConditionType.TicketType: {
        const conditionErrors = errors as FieldErrors<TicketTypeConditionFormInput> | undefined;
        return (
          <>
            <SelectField
              {...commonProps}
              label={t('component.conditions_builder.field.operator')}
              options={Object.values(EqualityOperator)}
              getOptionLabel={(option) => t(`common.enum.equality_operator.${option}`)}
              error={!!conditionErrors?.operator}
              helperText={conditionErrors?.operator?.message}
              value={condition.operator}
              onChange={handleChange('operator')}
            />
            <TicketTypeField
              {...commonProps}
              label={t('component.conditions_builder.field.value')}
              error={!!conditionErrors?.ticketType}
              helperText={conditionErrors?.ticketType?.message}
              value={condition.ticketType}
              onChange={handleChange('ticketType')}
            />
          </>
        );
      }
      default:
        return (
          <>
            <TextField sx={{ flex: 1 }} label={t('component.conditions_builder.field.operator')} disabled />
            <TextField sx={{ flex: 1 }} label={t('component.conditions_builder.field.value')} disabled />
          </>
        );
    }
  }, [commonProps, condition, errors, handleChange, t]);

  return (
    <Stack direction="row" spacing={1}>
      {condition.conditionType !== ConditionType.PenaltyType && (
        <SelectField
          {...commonProps}
          label={t('component.conditions_builder.field.condition')}
          options={conditionTypes}
          getOptionLabel={(option) => t(`core.enum.condition_type.${option}`)}
          error={!!errors?.conditionType}
          helperText={errors?.conditionType?.message}
          value={condition.conditionType}
          onChange={handleConditionTypeChange}
        />
      )}
      {inputs}
    </Stack>
  );
};
