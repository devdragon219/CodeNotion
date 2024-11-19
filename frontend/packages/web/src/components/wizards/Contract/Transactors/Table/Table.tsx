import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractTransactorsSchema } from '../../../../../utils/contract/schemas/transactors';
import { ContractTransactorsTable } from '../../../../domains/Contract/Transactors/Table/Table';
import { ContractTransactorsTableSubStepProps } from './Table.types';

export const ContractTransactorsTableSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractTransactorsTableSubStepProps) => {
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
    resolver: yupResolver(getContractTransactorsSchema(true, language, t)),
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
    if (errors.transactors?.root) {
      onError(errors.transactors.root.message);
    }
    // eslint-disable-next-line
  }, [errors.transactors?.root]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractTransactorsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
