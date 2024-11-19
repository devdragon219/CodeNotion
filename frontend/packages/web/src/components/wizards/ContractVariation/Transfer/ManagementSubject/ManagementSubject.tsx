import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, StepForm, TextField } from '@realgimm5/frontend-common/components';
import { PersonType, TakeoverType } from '@realgimm5/frontend-common/gql/types';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractTransferVariationManagementSubjectSchema } from '../../../../../utils/contractActions/schemas/contractTransfer';
import { SubjectField } from '../../../../core/Fields/Subject/Subject';
import { ManagementSubjectStepProps } from './ManagementSubject.types';

export const ManagementSubjectStep = ({
  contract,
  contractTransfer,
  onBack,
  onChange,
  onError,
  onSave,
}: ManagementSubjectStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractVariationTransferFormInput>({
    defaultValues: contractTransfer,
    resolver: yupResolver(getContractTransferVariationManagementSubjectSchema(language, t)),
  });
  const managementSubject = useWatch({ control, name: 'managementSubject' });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractVariationTransferFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm
      completeLabel="contract.dialog.contract_variation.action.transfer"
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSave)}
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="contract.section_title.new_management_subject" />
        <Grid2 size={12}>
          <TextField
            value={contract.managementSubject?.name}
            label={t('contract.field.previous_management_subject')}
            disabled
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name="managementSubject"
            control={control}
            render={({ field }) => (
              <SubjectField
                {...field}
                label={t('contract.field.new_management_subject')}
                error={!!errors.managementSubject}
                helperText={errors.managementSubject?.message ?? ''}
                required
                where={{
                  personType: {
                    eq: PersonType.ManagementSubject,
                  },
                  id: {
                    neq: contract.managementSubject!.id,
                  },
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
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
        <Grid2 size={{ xs: 12, sm: 6 }}>
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
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="paymentDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('contract.field.payment_date')}
                error={!!errors.paymentDate}
                helperText={errors.paymentDate?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="takeoverLegalRepresentativeSubject"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={t('contract.field.takeover_legal_representative')}
                options={managementSubject?.officers ?? []}
                getOptionKey={(option) => String(option.id)}
                getOptionLabel={(option) => option.name}
                error={!!errors.takeoverLegalRepresentativeSubject}
                helperText={errors.takeoverLegalRepresentativeSubject?.message}
                required
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
