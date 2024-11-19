import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';
import { getCostChargeUtilityServiceSchema } from '../../../../utils/costCharge/schemas/utilityService';
import { CostChargeUtilityService } from '../../../domains/CostCharge/UtilityService/UtilityService';
import { CostChargeUtilityServiceStepProps } from './UtilityService.types';
import { CostChargeUtilityServices } from './UtilityServices/UtilityServices';

export const CostChargeUtilityServiceStep = ({
  costCharge,
  utilityService,
  onChange,
  onError,
  onNext,
  onShowAllUtilityServiceEstateUnits,
  onShowAllUtilityServiceEstates,
}: CostChargeUtilityServiceStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CostChargeFormInput>({
    defaultValues: costCharge,
    resolver: yupResolver(getCostChargeUtilityServiceSchema(t)),
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
    if (errors.utilityService) {
      onError(errors.utilityService.message);
    }
    // eslint-disable-next-line
  }, [errors.utilityService]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      {utilityService ? (
        <CostChargeUtilityService control={control} />
      ) : (
        <CostChargeUtilityServices
          setValue={setValue}
          onShowAllUtilityServiceEstateUnits={onShowAllUtilityServiceEstateUnits}
          onShowAllUtilityServiceEstates={onShowAllUtilityServiceEstates}
        />
      )}
    </StepForm>
  );
};
