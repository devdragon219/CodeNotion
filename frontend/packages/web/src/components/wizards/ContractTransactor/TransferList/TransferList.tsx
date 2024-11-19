import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput, ContractTransactorFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractTransactorsSchema } from '../../../../utils/contract/schemas/transactors';
import { ContractTransactorsTransferList } from '../../../domains/Contract/Transactors/TransferList/TransferList';
import { ContractTransactorsTransferListStepProps } from './TransferList.types';

export const ContractTransactorsTransferListStep = ({
  currentTransactors,
  effectStartDate,
  isContractActive,
  transactors,
  onChange,
  onError,
  onNext,
}: ContractTransactorsTransferListStepProps) => {
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
    defaultValues: {
      effectStartDate,
      transactors,
    },
    resolver: yupResolver(getContractTransactorsSchema(false, language, t)),
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
    if (errors.transactors) {
      onError(errors.transactors.message);
    }
    // eslint-disable-next-line
  }, [errors.transactors]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractTransactorsTransferList
        control={control}
        excludeSubjectIds={currentTransactors.reduce<number[]>(
          (acc, { subject }) => (subject ? [...acc, subject.id] : acc),
          [],
        )}
        isContractActive={isContractActive}
        setValue={setValue}
      />
    </StepForm>
  );
};
