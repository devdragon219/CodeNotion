import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getAddressesSchema } from '../../../../utils/components/addressesField/schemas/addresses';
import { EstateAddresses } from '../../../domains/Estate/Addresses/Addresses';
import { EstateAddressesStepProps } from './Addresses.types';

export const EstateAddressesStep = ({ estate, onBack, onChange, onError, onNext }: EstateAddressesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateFormInput>({
    defaultValues: estate,
    resolver: yupResolver(getAddressesSchema(true, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateAddresses control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
