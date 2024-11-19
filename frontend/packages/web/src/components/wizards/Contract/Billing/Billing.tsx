import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractBillingSchema } from '../../../../utils/contract/schemas/billing';
import { ContractBilling } from '../../../domains/Contract/Billing/Billing';
import { ContractBillingStepProps } from './Billing.types';

export const ContractBillingStep = ({ contract, onBack, onChange, onError, onNext }: ContractBillingStepProps) => {
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
    resolver: yupResolver(getContractBillingSchema(language, t)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractBilling control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
