import { CatalogueTypeActivityType, TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';
import {
  getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput,
  getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput,
} from '../../../../../utils/ticketChecklistTemplate/initialValues';
import { CatalogueTypeField } from '../../../../core/Fields/CatalogueType/CatalogueType';
import { TicketChecklistTemplateCatalogueTypeFieldProps } from './CatalogueType.types';

export const TicketChecklistTemplateCatalogueTypeField = ({
  control,
  errors,
  readonly,
  setValue,
}: TicketChecklistTemplateCatalogueTypeFieldProps) => {
  const { t } = useTranslation();
  const ticketChecklistTemplateType = useWatch({ control, name: 'ticketChecklistTemplateType' })!;
  const catalogueCategory = useWatch({ control, name: 'catalogueCategory' });
  const catalogueSubCategory = useWatch({ control, name: 'catalogueSubCategory' });

  const handleChange = useCallback(
    (onChange: (value: CatalogueTypeFormInput | null) => void) => (value: CatalogueTypeFormInput | null) => {
      onChange(value);

      setValue('preventative', getEmptyTicketChecklistTemplatePreventativeMaintenanceFormInput());
      setValue('onCondition', getEmptyTicketChecklistTemplateOnConditionMaintenanceFormInput());
    },
    [setValue],
  );

  return (
    <Controller
      name="catalogueType"
      control={control}
      render={({ field }) => (
        <CatalogueTypeField
          {...field}
          onChange={handleChange(field.onChange)}
          label={t('ticket_checklist_template.field.catalogue_type')}
          error={!!errors.catalogueType}
          helperText={errors.catalogueType?.message}
          disabled={!catalogueCategory || catalogueCategory.catalogueTypes.length === 0}
          readonly={readonly}
          required
          where={{
            category: {
              id: {
                eq: catalogueCategory?.categoryId,
              },
            },
            subCategory: {
              id: {
                eq: catalogueSubCategory?.subCategoryId,
              },
            },
            ...(ticketChecklistTemplateType === TicketChecklistTemplateType.PreventativeAndOnTriggerCondition
              ? {
                  and: [
                    {
                      activities: {
                        some: {
                          activityType: {
                            eq: CatalogueTypeActivityType.OnIncident,
                          },
                        },
                      },
                    },
                    {
                      activities: {
                        some: {
                          activityType: {
                            eq: CatalogueTypeActivityType.PlannedMaintenance,
                          },
                        },
                      },
                    },
                  ],
                }
              : {
                  activities: {
                    some: {
                      ...(ticketChecklistTemplateType === TicketChecklistTemplateType.OnTriggerCondition
                        ? {
                            activityType: {
                              eq: CatalogueTypeActivityType.OnIncident,
                            },
                          }
                        : {
                            activityType: {
                              eq: CatalogueTypeActivityType.PlannedMaintenance,
                            },
                          }),
                    },
                  },
                }),
          }}
        />
      )}
    />
  );
};
