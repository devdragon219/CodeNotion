import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { getUtilityServiceEstatesSchema } from '../../../../utils/utilityService/schemas/estates';
import { UtilityServiceEstateStepProps } from './Estates.types';
import { EstatesField } from './Field/Field';

export const UtilityServiceEstateStep = ({
  currentEstates,
  utilityService,
  onBack,
  onChange,
  onError,
  onNext,
}: UtilityServiceEstateStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UtilityServiceFormInput>({
    defaultValues: utilityService,
    resolver: yupResolver(getUtilityServiceEstatesSchema(t)),
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
    if (errors.estates) {
      onError(errors.estates.message);
    }
    // eslint-disable-next-line
  }, [errors.estates]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstatesField control={control} currentEstates={currentEstates} />
    </StepForm>
  );
};
