import { Grid2 } from '@mui/material';
import { CurrencyField, SectionTitle, SelectField } from '@realgimm5/frontend-common/components';
import { CostBaseFactor } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateCostsProps } from './Costs.types';

export const TicketChecklistTemplateCosts = ({ control, errors, readonly }: TicketChecklistTemplateCostsProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket_checklist_template.section_title.costs" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="costBaseFactor"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('ticket_checklist_template.field.measurement_unit')}
              options={Object.values(CostBaseFactor)}
              getOptionLabel={(option) => t(`common.enum.cost_base_factor.${option}`)}
              error={!!errors.costBaseFactor}
              helperText={errors.costBaseFactor?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="rawWorkCost"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('ticket_checklist_template.field.raw_work_cost')}
              error={!!errors.rawWorkCost}
              helperText={errors.rawWorkCost?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="safetyCost"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('ticket_checklist_template.field.safety_cost')}
              error={!!errors.safetyCost}
              helperText={errors.safetyCost?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
