import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitEstateSchema } from '../../../../utils/estateUnit/schemas/estate';
import { EstateUnitActionEstate } from '../../../domains/EstateUnitAction/Estate/Estate';
import { EstateUnitSplitEstateStepProps } from './Estate.types';

export const EstateUnitSplitEstateStep = ({
  cityName,
  estateId,
  estateUnit,
  onChange,
  onError,
  onNext,
}: EstateUnitSplitEstateStepProps) => {
  const { t } = useTranslation();
  const {
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
      <EstateUnitActionEstate cityName={cityName} keepTopIds={estateId} setValue={setValue} />
    </StepForm>
  );
};
