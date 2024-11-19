import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractSecurityDepositsSchema } from '../../../../utils/contract/schemas/securityDeposits';
import { ContractSecurityDeposits } from '../../../domains/Contract/SecurityDeposits/SecurityDeposits';
import { ContractSecurityDepositsStepProps } from './SecurityDeposits.types';

export const ContractSecurityDepositsStep = ({
  contract,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractSecurityDepositsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractSecurityDepositsSchema(language, t)),
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
      <ContractSecurityDeposits control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
