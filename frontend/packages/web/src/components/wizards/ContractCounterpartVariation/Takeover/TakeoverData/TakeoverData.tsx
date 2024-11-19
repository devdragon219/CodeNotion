import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, StepForm } from '@realgimm5/frontend-common/components';
import { TakeoverType } from '@realgimm5/frontend-common/gql/types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartTakeoverVariationTakeoverDataSchema } from '../../../../../utils/contractActions/schemas/counterpartTakeover';
import { TakeoverDataStepProps } from './TakeoverData.types';

export const TakeoverDataStep = ({
  counterpartTakeover,
  isContractActive,
  managementSubjectOfficers,
  onBack,
  onChange,
  onError,
  onNext,
}: TakeoverDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationTakeoverFormInput>({
    defaultValues: counterpartTakeover,
    resolver: yupResolver(getContractCounterpartTakeoverVariationTakeoverDataSchema(isContractActive, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationTakeoverFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="contract.section_title.takeover_data" />
        <Grid2 size={{ xs: 12, sm: isContractActive ? 6 : 4 }}>
          <Controller
            name="takeoverDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('contract.field.takeover_date')}
                error={!!errors.takeoverDate}
                helperText={errors.takeoverDate?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: isContractActive ? 6 : 4 }}>
          <Controller
            name="takeoverType"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={t('contract.field.takeover_type')}
                options={Object.values(TakeoverType)}
                getOptionLabel={(option) => t(`common.enum.takeover_type.${option}`)}
                error={!!errors.takeoverType}
                helperText={errors.takeoverType?.message}
                required
              />
            )}
          />
        </Grid2>
        {!isContractActive && (
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="takeoverLegalRepresentativeSubject"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.takeover_legal_representative')}
                  options={managementSubjectOfficers}
                  getOptionKey={(option) => String(option.id)}
                  getOptionLabel={(option) => option.name}
                  error={!!errors.takeoverLegalRepresentativeSubject}
                  helperText={errors.takeoverLegalRepresentativeSubject?.message}
                  required
                />
              )}
            />
          </Grid2>
        )}
      </Grid2>
    </StepForm>
  );
};
