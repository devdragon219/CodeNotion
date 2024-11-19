import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitEstateSchema } from '../../../../utils/estateUnit/schemas/estate';
import { EstateUnitEstate } from '../../../domains/EstateUnit/Estate/Estate';
import { EstateUnitEstateStepProps } from './Estate.types';
import { EstateUnitEstates } from './Estates/Estates';

export const EstateUnitEstateStep = ({ estate, estateUnit, onChange, onError, onNext }: EstateUnitEstateStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnit,
    resolver: yupResolver(getEstateUnitEstateSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitFormInput);
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
      {estate ? (
        <EstateUnitEstate control={control} mode={FormMode.Create} />
      ) : (
        <EstateUnitEstates setValue={setValue} />
      )}
    </StepForm>
  );
};
