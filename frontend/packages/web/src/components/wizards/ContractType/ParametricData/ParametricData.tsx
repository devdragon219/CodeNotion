import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';
import { ContractTypeParametricData } from '../../../domains/ContractType/ParametricData/ParametricData';
import { ContractTypeParametricDataStepProps } from './ParametricData.types';

export const ContractTypeParametricDataStep = ({
  contractType,
  onChange,
  onBack,
  onError,
  onNext,
}: ContractTypeParametricDataStepProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractTypeFormInput>({
    defaultValues: contractType,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractTypeParametricData control={control} errors={errors} />
    </StepForm>
  );
};
