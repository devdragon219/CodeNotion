import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractCounterpartsSchema } from '../../../../../utils/contract/schemas/counterparts';
import { ContractCounterpartsTable } from '../../../../domains/Contract/Counterparts/Table/Table';
import { ContractCounterpartsTableSubStepProps } from './Table.types';

export const ContractCounterpartsTableSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractCounterpartsTableSubStepProps) => {
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
    resolver: yupResolver(getContractCounterpartsSchema(isContractActive, true, language, t)),
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
      />
    </StepForm>
  );
};
