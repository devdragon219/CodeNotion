import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../../../interfaces/FormInputs/CatalogueCategory';
import {
  getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput,
  getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput,
} from '../../../../utils/ticketChecklistTemplate/initialValues';
import { CatalogueCategoryField } from '../../../core/Fields/CatalogueCategory/CatalogueCategory';
import { CatalogueSubCategoryField } from '../../../core/Fields/CatalogueSubCategory/CatalogueSubCategory';
import { TicketChecklistTemplateCatalogueTypeField } from './CatalogueType/CatalogueType';
import { TicketChecklistTemplateGeneralDataProps } from './GeneralData.types';

export const TicketChecklistTemplateGeneralData = ({
  control,
  errors,
  readonly,
  setValue,
}: TicketChecklistTemplateGeneralDataProps) => {
  const { t } = useTranslation();
  const category = useWatch({ control, name: 'catalogueCategory' });

  const handleCategoryChange = useCallback(
    (onChange: (value: CatalogueCategoryFormInput | null) => void) => (value: CatalogueCategoryFormInput | null) => {
      onChange(value);

      setValue('catalogueSubCategory', null);
      setValue('catalogueType', null);
      setValue('preventative', getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput());
      setValue('onCondition', getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput());
    },
    [setValue],
  );

  const handleSubCategoryChange = useCallback(
    (onChange: (value: CatalogueSubCategoryFormInput | null) => void) =>
      (value: CatalogueSubCategoryFormInput | null) => {
        onChange(value);

        setValue('catalogueType', null);
        setValue('preventative', getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput());
        setValue('onCondition', getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput());
      },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket_checklist_template.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket_checklist_template.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket_checklist_template.field.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="catalogueCategory"
          control={control}
          render={({ field }) => (
            <CatalogueCategoryField
              {...field}
              onChange={handleCategoryChange(field.onChange)}
              label={t('ticket_checklist_template.field.catalogue_category')}
              error={!!errors.catalogueCategory}
              helperText={errors.catalogueCategory?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="catalogueSubCategory"
          control={control}
          render={({ field }) => (
            <CatalogueSubCategoryField
              {...field}
              onChange={handleSubCategoryChange(field.onChange)}
              label={t('ticket_checklist_template.field.catalogue_subcategory')}
              catalogueCategoryId={category?.categoryId}
              error={!!errors.catalogueSubCategory}
              helperText={errors.catalogueSubCategory?.message}
              disabled={!category || category.subCategories.length === 0}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <TicketChecklistTemplateCatalogueTypeField
          control={control}
          errors={errors}
          readonly={readonly}
          setValue={setValue}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="ticketChecklistTemplateType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('ticket_checklist_template.field.ticket_checklist_template_type')}
              options={Object.values(TicketChecklistTemplateType)}
              getOptionLabel={(option) => t(`common.enum.ticket_checklist_template_type.${option}`)}
              error={!!errors.ticketChecklistTemplateType}
              helperText={errors.ticketChecklistTemplateType?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
