import { Grid2 } from '@mui/material';
import {
  RecapSection,
  RecapSectionSimpleItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { UtilityTypeRecapStepProps } from './Recap.types';

export const UtilityTypeRecapStep = ({ utilityType, onBack, onEdit, onSave }: UtilityTypeRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(utilityType);
  }, [utilityType, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="utility_type.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="utility_type.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'utility_type.field.utility_category',
                  value: utilityType.category ? t(`common.enum.utility_category.${utilityType.category}`) : null,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.utility_code',
                  value: utilityType.internalCode,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.utility_description',
                  value: utilityType.description,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.external_code',
                  value: utilityType.externalCode,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.expense_class',
                  value: utilityType.expenseClass,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.measurement_unit_code',
                  value: utilityType.measurementUnit,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.measurement_unit_description',
                  value: utilityType.measurementUnitDescription,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.time_of_use_rate_count',
                  value: utilityType.timeOfUseRateCount,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.metering_type',
                  value: utilityType.meteringType ? t(`common.enum.metering_type.${utilityType.meteringType}`) : null,
                },
                {
                  grid: 4,
                  label: 'utility_type.field.has_heating_accounting_system',
                  value: utilityType.hasHeatingAccountingSystem,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="utility_type.tab.fields"
              items={utilityType.fields.flatMap(({ fields }) =>
                fields.map(
                  (field) =>
                    ({
                      label: `common.enum.custom_field_type.${field.fieldType}`,
                      value: field.name,
                    }) as RecapSectionSimpleItem,
                ),
              )}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="utility_type.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
