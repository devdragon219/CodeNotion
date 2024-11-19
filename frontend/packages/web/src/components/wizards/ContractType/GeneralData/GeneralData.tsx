import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useContractType } from '../../../../hooks/useContractType';
import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';
import { getContractTypeGeneralDataSchema } from '../../../../utils/contractType/schemas/generalData';
import { ContractTypeGeneralData } from '../../../domains/ContractType/GeneralData/GeneralData';
import { ContractTypeGeneralDataStepProps } from './GeneralData.types';

export const ContractTypeGeneralDataStep = ({
  contractType,
  canUseInternalCode,
  onChange,
  onError,
  onNext,
}: ContractTypeGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useContractType();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ContractTypeFormInput>({
    defaultValues: contractType,
    resolver: yupResolver(getContractTypeGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (contractType.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractTypeGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
