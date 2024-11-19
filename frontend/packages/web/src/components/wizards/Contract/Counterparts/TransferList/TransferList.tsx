import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractCounterpartsSchema } from '../../../../../utils/contract/schemas/counterparts';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { ContractCounterpartsTransferListSubStepProps } from './TransferList.types';

export const ContractCounterpartsTransferListSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractCounterpartsTransferListSubStepProps) => {
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
    resolver: yupResolver(getContractCounterpartsSchema(isContractActive, false, language, t)),
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
    if (errors.counterparts) {
      onError(errors.counterparts.message);
    }
    // eslint-disable-next-line
  }, [errors.counterparts]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Controller
        name="counterparts"
        control={control}
        render={({ field }) => (
          <ContractCounterpartsTransferList
            {...field}
            isContractActive={isContractActive}
            since={contract.effectStartDate}
            titles={{
              left: `contract.section_title.counterparts_${isContractActive ? 'tenant' : 'landlord'}`,
              right: `contract.section_title.selected_counterparts_${isContractActive ? 'tenant' : 'landlord'}`,
            }}
          />
        )}
      />
    </StepForm>
  );
};
