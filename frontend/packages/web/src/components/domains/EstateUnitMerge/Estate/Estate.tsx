import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitEstateSchema } from '../../../../utils/estateUnit/schemas/estate';
import { EstateUnitActionEstate } from '../../EstateUnitAction/Estate/Estate';
import { EstateUnitMergeEstateStepProps } from './Estate.types';

export const EstateUnitMergeEstateStep = ({
  estateUnitMerge,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitMergeEstateStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnitMerge.toEstateUnit,
    resolver: yupResolver(getEstateUnitEstateSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitMerge,
        toEstateUnit: formValues as EstateUnitFormInput,
      });
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
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionEstate
        cityName={estateUnitMerge.fromEstateUnits[0].address.city!.name}
        keepTopIds={estateUnitMerge.fromEstateUnits.map(({ estate }) => estate.id)}
        setValue={setValue}
      />
    </StepForm>
  );
};
