import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { getRegistrationPaymentGeneralDataSchema } from '../../../../utils/registrationPayment/schemas/generalData';
import { RegistrationPaymentGeneralData } from '../../../domains/RegistrationPayment/GeneralData/GeneralData';
import { RegistrationPaymentGeneralDataStepProps } from './GeneralData.types';

export const RegistrationPaymentGeneralDataStep = ({
  registrationPayment,
  onBack,
  onChange,
  onError,
  onNext,
}: RegistrationPaymentGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegistrationPaymentFormInput>({
    defaultValues: registrationPayment,
    resolver: yupResolver(getRegistrationPaymentGeneralDataSchema(language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as RegistrationPaymentFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <RegistrationPaymentGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
