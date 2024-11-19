import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { getRegistrationPaymentRowsSchema } from '../../../../utils/registrationPayment/schemas/rows';
import { RegistrationPaymentRows } from '../../../domains/RegistrationPayment/Rows/Rows';
import { RegistrationPaymentRowsStepProps } from './Rows.types';

export const RegistrationPaymentRowsStep = ({
  registrationPayment,
  onBack,
  onChange,
  onError,
  onNext,
}: RegistrationPaymentRowsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegistrationPaymentFormInput>({
    defaultValues: registrationPayment,
    resolver: yupResolver(getRegistrationPaymentRowsSchema(t)),
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
      <RegistrationPaymentRows control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
