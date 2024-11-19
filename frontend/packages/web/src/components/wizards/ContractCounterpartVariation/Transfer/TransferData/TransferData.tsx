import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartTransferVariationTransferDataSchema } from '../../../../../utils/contractActions/schemas/counterpartTransfer';
import { TransferDataStepProps } from './TransferData.types';

export const TransferDataStep = ({
  counterpartTransfer,
  isContractActive,
  managementSubjectOfficers,
  onBack,
  onChange,
  onError,
  onNext,
}: TransferDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationTransferFormInput>({
    defaultValues: counterpartTransfer,
    resolver: yupResolver(getContractCounterpartTransferVariationTransferDataSchema(isContractActive, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationTransferFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="contract.section_title.transfer_data" />
        <Grid2 size={{ xs: 12, sm: isContractActive ? 12 : 6 }}>
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
        {!isContractActive && (
          <Grid2 size={{ xs: 12, sm: 6 }}>
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
