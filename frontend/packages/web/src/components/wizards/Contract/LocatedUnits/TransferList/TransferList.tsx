import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractLocatedUnitsSchema } from '../../../../../utils/contract/schemas/locatedUnits';
import { ContractLocatedUnitsTransferList } from '../../../../domains/Contract/LocatedUnits/TransferList/TransferList';
import { ContractLocatedUnitsTransferListSubStepProps } from './TransferList.types';

export const ContractLocatedUnitsTransferListSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractLocatedUnitsTransferListSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractLocatedUnitsSchema(isContractActive, false, t)),
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
    if (errors.locatedUnits) {
      onError(errors.locatedUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.locatedUnits]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractLocatedUnitsTransferList control={control} isContractActive={isContractActive} setValue={setValue} />
    </StepForm>
  );
};
