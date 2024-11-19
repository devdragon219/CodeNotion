import { Grid2 } from '@mui/material';
import { DateField, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OfficialActFieldProps } from './Field.types';

export const OfficialActField = ({ control, errors, readonly }: OfficialActFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="officialAct.protocolNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_protocol_number')}
              error={!!errors.officialAct?.protocolNumber}
              helperText={errors.officialAct?.protocolNumber?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="officialAct.repertoireNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_repertoire_number')}
              error={!!errors.officialAct?.repertoireNumber}
              helperText={errors.officialAct?.repertoireNumber?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.registrationNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_registration_number')}
              error={!!errors.officialAct?.registrationNumber}
              helperText={errors.officialAct?.registrationNumber?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.registrationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('estate_unit.field.official_act_registration_date')}
              error={!!errors.officialAct?.registrationDate}
              helperText={errors.officialAct?.registrationDate?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.writtenAtCity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_written_at_city')}
              error={!!errors.officialAct?.writtenAtCity}
              helperText={errors.officialAct?.writtenAtCity?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.transcriptionNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_transcription_number')}
              error={!!errors.officialAct?.transcriptionNumber}
              helperText={errors.officialAct?.transcriptionNumber?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.transcriptionDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('estate_unit.field.official_act_transcription_date')}
              error={!!errors.officialAct?.transcriptionDate}
              helperText={errors.officialAct?.transcriptionDate?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.transcriptionCity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_transcription_city')}
              error={!!errors.officialAct?.transcriptionCity}
              helperText={errors.officialAct?.transcriptionCity?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.notaryActDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('estate_unit.field.official_act_notary_act_date')}
              error={!!errors.officialAct?.notaryActDate}
              helperText={errors.officialAct?.notaryActDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.collectionNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_collection_number')}
              error={!!errors.officialAct?.collectionNumber}
              helperText={errors.officialAct?.collectionNumber?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="officialAct.notaryName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.official_act_notary_name')}
              error={!!errors.officialAct?.notaryName}
              helperText={errors.officialAct?.notaryName?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
