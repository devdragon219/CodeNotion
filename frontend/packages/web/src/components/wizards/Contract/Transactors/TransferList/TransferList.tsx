import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractTransactorsSchema } from '../../../../../utils/contract/schemas/transactors';
import { ContractTransactorsTransferList } from '../../../../domains/Contract/Transactors/TransferList/TransferList';
import { ContractTransactorsTransferListSubStepProps } from './TransferList.types';

export const ContractTransactorsTransferListSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractTransactorsTransferListSubStepProps) => {
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
    resolver: yupResolver(getContractTransactorsSchema(false, language, t)),
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
    if (errors.transactors) {
      onError(errors.transactors.message);
    }
    // eslint-disable-next-line
  }, [errors.transactors]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractTransactorsTransferList control={control} isContractActive={isContractActive} setValue={setValue} />
    </StepForm>
  );
};
