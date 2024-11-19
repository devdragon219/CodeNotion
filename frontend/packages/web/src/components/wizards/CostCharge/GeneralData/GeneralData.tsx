import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';
import { getCostChargeGeneralDataSchema } from '../../../../utils/costCharge/schemas/generalData';
import { CostChargeGeneralData } from '../../../domains/CostCharge/GeneralData/GeneralData';
import { CostChargeGeneralDataStepProps } from './GeneralData.types';

export const CostChargeGeneralDataStep = ({
  costCharge,
  onBack,
  onChange,
  onError,
  onNext,
}: CostChargeGeneralDataStepProps) => {
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
  } = useForm<CostChargeFormInput>({
    defaultValues: costCharge,
    resolver: yupResolver(
      getCostChargeGeneralDataSchema(parseStringToDate(costCharge.utilityService?.activationDate), language, t),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CostChargeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.consumptions?.message) {
      onError(errors.consumptions.message);
    }
    // eslint-disable-next-line
  }, [errors.consumptions?.message]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CostChargeGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
