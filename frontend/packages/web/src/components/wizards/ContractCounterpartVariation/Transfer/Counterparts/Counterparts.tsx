import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractCounterpartsSchema } from '../../../../../utils/contract/schemas/counterparts';
import { ContractCounterpartsTable } from '../../../../domains/Contract/Counterparts/Table/Table';
import { CounterpartsStepProps } from './Counterparts.types';

export const CounterpartsStep = ({
  counterpartTransfer,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: CounterpartsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const originalCounterparts = useMemo(
    () =>
      currentCounterparts.filter(
        ({ counterpartId }) =>
          !counterpartTransfer.originalCounterparts.map(({ counterpartId }) => counterpartId).includes(counterpartId),
      ),
    [currentCounterparts, counterpartTransfer.originalCounterparts],
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: {
      counterparts: [...originalCounterparts, ...counterpartTransfer.takeoverCounterparts],
    },
    resolver: yupResolver(getContractCounterpartsSchema(isContractActive, true, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      const { counterparts } = formValues as ContractFormInput;
      onChange({
        ...counterpartTransfer,
        counterparts,
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.counterparts?.root) {
      onError(errors.counterparts.root.message);
    }
    // eslint-disable-next-line
  }, [errors.counterparts?.root]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractCounterpartsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
        readonlyFields={[
          {
            field: 'since',
            untilIndex: originalCounterparts.length + counterpartTransfer.takeoverCounterparts.length,
          },
          {
            field: 'counterpartType',
            untilIndex: originalCounterparts.length,
          },
        ]}
      />
    </StepForm>
  );
};
