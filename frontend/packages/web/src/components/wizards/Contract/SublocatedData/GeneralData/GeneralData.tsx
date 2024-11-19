import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractSublocatedDataSchema } from '../../../../../utils/contract/schemas/sublocatedData';
import { ContractSublocatedData } from '../../../../domains/Contract/SublocatedData/SublocatedData';
import { ContractSublocatedDataGeneralDataSubStepProps } from './GeneralData.types';

export const ContractSublocatedDataGeneralDataSubStep = ({
  contract,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractSublocatedDataGeneralDataSubStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractSublocatedDataSchema(true, language, t)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractSublocatedData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        setValue={setValue}
        trigger={trigger}
      />
    </StepForm>
  );
};
