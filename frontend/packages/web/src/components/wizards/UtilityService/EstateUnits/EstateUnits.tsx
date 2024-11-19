import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { getUtilityServiceEstateUnitsSchema } from '../../../../utils/utilityService/schemas/estateUnits';
import { UtilityServiceEstateUnitsStepProps } from './EstateUnits.types';
import { EstateUnitsField } from './Field/Field';

export const UtilityServiceEstateUnitsStep = ({
  utilityService,
  onBack,
  onChange,
  onError,
  onNext,
}: UtilityServiceEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UtilityServiceFormInput>({
    defaultValues: utilityService,
    resolver: yupResolver(getUtilityServiceEstateUnitsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UtilityServiceFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.estateUnits) {
      onError(errors.estateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.estateUnits]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitsField control={control} />
    </StepForm>
  );
};
