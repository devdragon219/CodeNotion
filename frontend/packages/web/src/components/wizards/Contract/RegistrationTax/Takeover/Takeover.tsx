import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractRegistrationTaxSchema } from '../../../../../utils/contract/schemas/registrationTax';
import { ContractRegistrationTaxTakeover } from '../../../../domains/Contract/RegistrationTax/Takeover/Takeover';
import { ContractRegistrationTaxTakeoverSubStepProps } from './Takeover.types';

export const ContractRegistrationTaxTakeoverSubStep = ({
  contract,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractRegistrationTaxTakeoverSubStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractRegistrationTaxSchema(true, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.registrationTax?.takeoverSubjects) {
      onError(errors.registrationTax.takeoverSubjects.message);
    }
    // eslint-disable-next-line
  }, [errors.registrationTax?.takeoverSubjects]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractRegistrationTaxTakeover control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
