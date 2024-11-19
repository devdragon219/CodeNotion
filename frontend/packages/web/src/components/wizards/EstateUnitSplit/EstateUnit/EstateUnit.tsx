import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitGeneralDataSchema } from '../../../../utils/estateUnit/schemas/generalData';
import { EstateUnitActionEstateUnit } from '../../../domains/EstateUnitAction/EstateUnit/EstateUnit';
import { EstateUnitSplitEstateUnitStepProps } from './EstateUnit.types';

export const EstateUnitSplitEstateUnitStep = ({
  alreadyInUseInternalCodes,
  estateUnit,
  minDate,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitSplitEstateUnitStepProps) => {
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
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnit,
    resolver: yupResolver(getEstateUnitGeneralDataSchema(language, t, minDate)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionEstateUnit
        alreadyInUseInternalCodes={alreadyInUseInternalCodes}
        control={control}
        errors={errors}
        estateId={estateUnit.estate!.id}
        setValue={setValue}
      />
    </StepForm>
  );
};
