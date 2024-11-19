import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCadastralUnitGeneralDataSchema } from '../../../../utils/cadastralUnit/schemas/generalData';
import { getCadastralUnitInspectionSchema } from '../../../../utils/cadastralUnit/schemas/inspection';
import { EstateUnitActionCadastralUnit } from '../../../domains/EstateUnitAction/CadastralUnit/CadastralUnit';
import { EstateUnitSplitCadastralUnitStepProps } from './CadastralUnit.types';

export const EstateUnitSplitCadastralUnitStep = ({
  estateUnit,
  minDate,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitSplitCadastralUnitStepProps) => {
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
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnit.cadastralUnit!,
    resolver: yupResolver(
      getCadastralUnitGeneralDataSchema(language, t, { minDate }).concat(getCadastralUnitInspectionSchema(language, t)),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnit,
        cadastralUnit: formValues as EstateUnitCadastralUnitFormInput,
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionCadastralUnit
        control={control}
        errors={errors}
        estateUnitInternalCode={estateUnit.internalCode}
        setValue={setValue}
      />
    </StepForm>
  );
};
