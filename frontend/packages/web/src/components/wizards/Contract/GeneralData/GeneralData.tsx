import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useContract } from '../../../../hooks/useContract';
import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractGeneralDataSchema } from '../../../../utils/contract/schemas/generalData';
import { ContractGeneralData } from '../../../domains/Contract/GeneralData/GeneralData';
import { ContractGeneralDataStepProps } from './GeneralData.types';

export const ContractGeneralDataStep = ({
  canUseInternalCode,
  contract,
  isContractActive,
  onChange,
  onError,
  onNext,
}: ContractGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useContract();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractGeneralDataSchema(canUseInternalCode, language, t)),
  });

  useEffect(() => {
    if (contract.internalCode === '') {
      getInternalCode(isContractActive, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractGeneralData
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
        setValue={setValue}
        trigger={trigger}
      />
    </StepForm>
  );
};
