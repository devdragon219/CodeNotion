import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, StepForm, TextField } from '@realgimm5/frontend-common/components';
import { UnitCondition } from '@realgimm5/frontend-common/gql/types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateRefactoringFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEstateRefactoringGeneralDataSchema } from '../../../../utils/estate/schemas/refactoringGeneralData';
import { EstateRefactoringGeneralDataStepProps } from './GeneralData.types';

export const EstateRefactoringGeneralDataStep = ({
  estateRefactoring,
  onChange,
  onError,
  onNext,
}: EstateRefactoringGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateRefactoringFormInput>({
    defaultValues: estateRefactoring,
    resolver: yupResolver(getEstateRefactoringGeneralDataSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateRefactoringFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="estate.section_title.general_data" />
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="referenceYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                maxLength={4}
                label={t('estate.field.refactoring_year')}
                error={!!errors.referenceYear}
                helperText={errors.referenceYear?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="buildingPermitYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                maxLength={4}
                label={t('estate.field.refactoring_building_permit_year')}
                error={!!errors.buildingPermitYear}
                helperText={errors.buildingPermitYear?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={Object.values(UnitCondition)}
                getOptionLabel={(type) => t(`common.enum.unit_condition.${type}`)}
                label={t('estate.field.refactoring_condition')}
                error={!!errors.condition}
                helperText={errors.condition?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="ageCoefficient"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label={t('estate.field.refactoring_age_condition')}
                error={!!errors.ageCoefficient}
                helperText={errors.ageCoefficient?.message}
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
