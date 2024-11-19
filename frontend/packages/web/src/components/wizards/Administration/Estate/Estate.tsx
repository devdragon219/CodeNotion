import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';
import { getAdministrationEstateSchema } from '../../../../utils/administration/schemas/estate';
import { AdministrationEstateStepProps } from './Estate.types';
import { AdministrationEstates } from './Estates/Estates';

export const AdministrationEstateStep = ({
  administration,
  onChange,
  onError,
  onNext,
}: AdministrationEstateStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<AdministrationsFormInput>({
    defaultValues: administration,
    resolver: yupResolver(getAdministrationEstateSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as AdministrationsFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.estate) {
      onError(errors.estate.message);
    }
    // eslint-disable-next-line
  }, [errors.estate]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <AdministrationEstates setValue={setValue} />
    </StepForm>
  );
};
