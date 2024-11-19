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

import { CatalogueTypeRecapStepProps } from './Recap.types';

export const CatalogueTypeRecapStep = ({ catalogueType, onBack, onEdit, onSave }: CatalogueTypeRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(catalogueType);
  }, [catalogueType, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="catalogue_type.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="catalogue_type.tab.general_data"
              items={[
                {
                  label: 'catalogue_type.field.catalogue_type_code',
                  value: catalogueType.internalCode,
                },
                {
                  label: 'catalogue_type.field.catalogue_type',
                  value: catalogueType.name,
                },
                {
                  label: 'catalogue_type.field.catalogue_type_category',
                  value: catalogueType.category?.name,
                },
                {
                  label: 'catalogue_type.field.catalogue_type_subcategory',
                  value: catalogueType.subCategory?.name,
                },
                {
                  label: 'catalogue_type.field.catalogue_type_usage_type',
                  value: catalogueType.usageTypes.map((usageType) => usageType.name).join(', '),
                },
                {
                  label: 'catalogue_type.field.notes',
                  value: catalogueType.notes,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="catalogue_type.tab.fields"
              items={catalogueType.fields.flatMap(({ fields }) =>
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
          <Grid2 size={12}>
            <RecapSection
              title="catalogue_type.tab.activities"
              items={[
                {
                  value: {
                    columns: ['catalogue_type.field.activity_type', 'catalogue_type.field.activity_name'],
                    rows: catalogueType.activities.map((entry) => [
                      entry.activityType ? t(`common.enum.catalogue_type_activity_type.${entry.activityType}`) : null,
                      entry.name,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="catalogue_type.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
