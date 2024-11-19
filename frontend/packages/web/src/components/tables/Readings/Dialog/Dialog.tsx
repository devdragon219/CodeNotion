import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  DateField,
  Dialog,
  DialogContent,
  Form,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { MeteringType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ReadingFormInput } from '../../../../interfaces/FormInputs/Reading';
import { getEmptyReadingFormInput } from '../../../../utils/reading/initialValues';
import { getReadingSchema } from '../../../../utils/reading/schemas/reading';
import { ReadingDialogProps } from './Dialog.types';

export const ReadingDialog = ({ reading, readonly, utilityService, onClose, onSave }: ReadingDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const isReading = useMemo(
    () => MeteringType.IncrementalReading === utilityService.utilityType?.meteringType,
    [utilityService.utilityType?.meteringType],
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReadingFormInput>({
    defaultValues: reading ?? getEmptyReadingFormInput(utilityService),
    resolver: yupResolver(getReadingSchema(isReading, language, t)),
  });

  const onSubmit = useCallback(
    (formValues: ReadingFormInput) => {
      onSave(formValues, reading ? FormMode.Edit : FormMode.Create);
    },
    [reading, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`${isReading ? 'reading' : 'usage'}.dialog.${reading ? 'edit' : 'create'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value={`${isReading ? 'reading' : 'usage'}.section_title.measurement_data`} />
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                value={utilityService.utilityType?.measurementUnit}
                label={t(`${isReading ? 'reading' : 'usage'}.field.measurement_unit_code`)}
                readonly={readonly}
                disabled
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                value={utilityService.utilityType?.measurementUnitDescription}
                label={t(`${isReading ? 'reading' : 'usage'}.field.measurement_unit_description`)}
                readonly={readonly}
                disabled
              />
            </Grid2>
            <SectionTitle value={isReading ? 'reading.section_title.reading_data' : 'usage.section_title.usage_data'} />
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="readingTimestamp"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t(`${isReading ? 'reading' : 'usage'}.field.date`)}
                    error={!!errors.readingTimestamp}
                    helperText={errors.readingTimestamp?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="isEstimated"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    options={[true, false]}
                    getOptionLabel={(option) => t(`${isReading ? 'reading' : 'usage'}.estimated.${option}`)}
                    label={t(`${isReading ? 'reading' : 'usage'}.field.type`)}
                    error={!!errors.isEstimated}
                    helperText={errors.isEstimated?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    label={t(`${isReading ? 'reading' : 'usage'}.field.notes`)}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            {Array.from(Array(utilityService.utilityType?.timeOfUseRateCount ?? 0)).map((_, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 4 }}>
                <Controller
                  name={`values.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label={t(`${isReading ? 'reading' : 'usage'}.field.value`, { index: index + 1 })}
                      error={!!errors.values?.[index]?.value}
                      helperText={errors.values?.[index]?.value?.message}
                      readonly={readonly}
                      required
                    />
                  )}
                />
              </Grid2>
            ))}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
