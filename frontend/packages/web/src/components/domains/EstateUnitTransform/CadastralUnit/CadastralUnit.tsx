import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { add } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCadastralUnitGeneralDataSchema } from '../../../../utils/cadastralUnit/schemas/generalData';
import { getCadastralUnitInspectionSchema } from '../../../../utils/cadastralUnit/schemas/inspection';
import { EstateUnitActionCadastralUnit } from '../../EstateUnitAction/CadastralUnit/CadastralUnit';
import { EstateUnitTransformCadastralUnitStepProps } from './CadastralUnit.types';

export const EstateUnitTransformCadastralUnitStep = ({
  estateUnitTransform,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitTransformCadastralUnitStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const minDate = useMemo(() => {
    const minDate = parseStringToDate(estateUnitTransform.fromEstateUnit?.currentCadastralUnit?.since);
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
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnitTransform.toEstateUnit.cadastralUnit!,
    resolver: yupResolver(
      getCadastralUnitGeneralDataSchema(language, t, { minDate }).concat(getCadastralUnitInspectionSchema(language, t)),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitTransform,
        toEstateUnit: {
          ...estateUnitTransform.toEstateUnit,
          cadastralUnit: formValues as EstateUnitCadastralUnitFormInput,
        },
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
        estateUnitInternalCode={estateUnitTransform.toEstateUnit.internalCode}
        setValue={setValue}
      />
    </StepForm>
  );
};
