import { Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { AdministrationField } from '../Field/Field';
import { AdministrationGeneralDataProps } from './GeneralData.types';

export const AdministrationGeneralData = ({ onChange, value, readonly, errors }: AdministrationGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value={'administration.section_title.estate'} />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          value={value.estate?.internalCode ?? ''}
          label={t('estate.field.estate_code')}
          error={!!errors.estate?.internalCode}
          helperText={errors.estate?.internalCode?.message}
          link={`/app/real-estate/estates/${value.estate?.id}`}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          value={value.estate?.name ?? ''}
          label={t('estate.field.estate_name')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={12}>
        <AdministrationField readonly={readonly} onChange={onChange} value={value} errors={errors} />
      </Grid2>
    </Grid2>
  );
};
