import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput, ContractTransactorFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractTransactorsSchema } from '../../../../utils/contract/schemas/transactors';
import { ContractTransactorsTable } from '../../../domains/Contract/Transactors/Table/Table';
import { ContractTransactorsTableStepProps } from './Table.types';

export const ContractTransactorsTableStep = ({
  isContractActive,
  transactors,
  onBack,
  onChange,
  onError,
  onSave,
}: ContractTransactorsTableStepProps) => {
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
      transactors,
    },
    resolver: yupResolver(getContractTransactorsSchema(true, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ transactors }) => {
      onChange(transactors as ContractTransactorFormInput[]);
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

  const handleSave = useCallback(
    ({ transactors }: ContractFormInput) => {
      onSave(transactors);
    },
    [onSave],
  );

  return (
    <StepForm onBack={onBack} onComplete={onError} onSubmit={handleSubmit(handleSave)}>
      <ContractTransactorsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
