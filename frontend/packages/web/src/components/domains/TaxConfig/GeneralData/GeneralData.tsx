import { Grid2 } from '@mui/material';
import { SectionTitle } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';

import { TaxConfigValueField } from '../../../core/Fields/TaxConfigValue/TaxConfigValue';
import { TaxConfigGeneralDataProps } from './GeneralData.types';

export const TaxConfigGeneralData = ({ control, errors, mode, readonly }: TaxConfigGeneralDataProps) => (
  <Grid2 container spacing={{ xs: 2, sm: 3 }}>
    <SectionTitle value="tax_config.section_title.general_data" />
    <Grid2 size={12}>
      <Controller
        control={control}
        name="table"
        render={({ field }) => <TaxConfigValueField {...field} errors={errors.table} mode={mode} readonly={readonly} />}
      />
    </Grid2>
  </Grid2>
);
