import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { CadastralUnitIncome } from '../../../domains/CadastralUnit/Income/Income';
import { CadastralUnitIncomeStepProps } from './Income.types';

export const CadastralUnitIncomeStep = ({
  cadastralUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: CadastralUnitIncomeStepProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: cadastralUnit,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CadastralUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CadastralUnitIncome control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
