import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractCounterpartsSchema } from '../../../../../utils/contract/schemas/counterparts';
import { ContractCounterpartsTable } from '../../../../domains/Contract/Counterparts/Table/Table';
import { CounterpartsStepProps } from './Counterparts.types';

export const CounterpartsStep = ({
  counterpartAdd,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onSave,
}: CounterpartsStepProps) => {
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
    defaultValues: {
      counterparts: [...currentCounterparts, ...counterpartAdd.newCounterparts],
    },
    resolver: yupResolver(getContractCounterpartsSchema(isContractActive, true, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      const { counterparts } = formValues as ContractFormInput;
      onChange({
        ...counterpartAdd,
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

  const handleSave = useCallback(
    ({ counterparts }: ContractFormInput) => {
      onSave({
        ...counterpartAdd,
        counterparts,
      });
    },
    [counterpartAdd, onSave],
  );

  return (
    <StepForm
      completeLabel={`contract.dialog.counterpart_variation.action.${isContractActive ? 'tenant' : 'landlord'}`}
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(handleSave)}
    >
      <ContractCounterpartsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
        readonlyFields={[
          {
            field: 'since',
            untilIndex: currentCounterparts.length,
          },
        ]}
      />
    </StepForm>
  );
};
