import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { add } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitTransformToEstateUnitSchema } from '../../../../utils/estateUnitActions/schemas/transformToEstateUnit';
import { EstateUnitActionEstateUnit } from '../../EstateUnitAction/EstateUnit/EstateUnit';
import { EstateUnitTransformToEstateUnitStepProps } from './ToEstateUnit.types';

export const EstateUnitTransformToEstateUnitStep = ({
  estateUnitTransform,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitTransformToEstateUnitStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const minDate = useMemo(() => {
    const minDate = estateUnitTransform.fromEstateUnit?.ownershipStartDate;
    if (!minDate) {
      return undefined;
    }
    return add(minDate, { days: 1 });
  }, [estateUnitTransform.fromEstateUnit]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnitTransform.toEstateUnit,
    resolver: yupResolver(
      getEstateUnitTransformToEstateUnitSchema(
        estateUnitTransform.fromEstateUnit!.type,
        estateUnitTransform.fromEstateUnit!.usageType.id,
        language,
        t,
        minDate,
      ),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitTransform,
        toEstateUnit: formValues as EstateUnitFormInput,
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionEstateUnit
        control={control}
        errors={errors}
        estateId={estateUnitTransform.toEstateUnit.estate!.id}
        setValue={setValue}
      />
    </StepForm>
  );
};
