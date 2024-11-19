import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';
import { getAdministrationTermInstallmentsSchema } from '../../../../utils/administrationTerm/schemas/installments';
import { AdministrationTermInstallments } from '../../../domains/AdministrationTerm/Installments/Installments';
import { AdministrationTermInstallmentsStepProps } from './Installments.types';

export const AdministrationTermInstallmentsStep = ({
  administrationTerm,
  onBack,
  onChange,
  onError,
  onNext,
}: AdministrationTermInstallmentsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<AdministrationTermFormInput>({
    defaultValues: administrationTerm,
    resolver: yupResolver(
      getAdministrationTermInstallmentsSchema(
        administrationTerm.since,
        administrationTerm.until,
        administrationTerm.expectedAmount ?? 0,
        administrationTerm.installments,
        language,
        t,
      ),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as AdministrationTermFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <AdministrationTermInstallments control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
