import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SectionTitle, SelectField, StepForm, TextField } from '@realgimm5/frontend-common/components';
import { EstateTotalMarketValueCoefficientType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEmptyEstateCoefficientFormInput } from '../../../../utils/estate/initialValues';
import { getEstateTotalMarketValueCoefficientsSchema } from '../../../../utils/estate/schemas/totalMarketValueCoefficients';
import { EstateCoefficientsStepProps } from './Coefficients.types';

export const EstateCoefficientsStep = ({
  estateTotalMarketValue,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateCoefficientsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateTotalMarketValueFormInput>({
    defaultValues: estateTotalMarketValue,
    resolver: yupResolver(getEstateTotalMarketValueCoefficientsSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coefficients',
  });

  const handleAddCoefficient = useCallback(() => {
    append(getEmptyEstateCoefficientFormInput());
  }, [append]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateTotalMarketValueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="estate.section_title.add_coefficients" />
        <Grid2 size={12}>
          <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
            {fields.map(({ key }, index) => (
              <RepeatableField key={key} index={index} onDelete={remove}>
                <Grid2 container spacing={{ xs: 2, sm: 3 }}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name={`coefficients.${index}.coefficientType`}
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          {...field}
                          options={Object.values(EstateTotalMarketValueCoefficientType)}
                          getOptionLabel={(type) => t(`common.enum.estate_total_market_value_coefficient_type.${type}`)}
                          label={t('estate.field.coefficient_type')}
                          error={!!errors.coefficients?.[index]?.coefficientType}
                          helperText={errors.coefficients?.[index]?.coefficientType?.message}
                          required
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name={`coefficients.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label={t('estate.field.coefficient_value')}
                          error={!!errors.coefficients?.[index]?.value}
                          helperText={errors.coefficients?.[index]?.value?.message}
                          required
                        />
                      )}
                    />
                  </Grid2>
                </Grid2>
              </RepeatableField>
            ))}
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddCoefficient}>
            {t('estate.action.add_coefficient')}
          </Button>
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
