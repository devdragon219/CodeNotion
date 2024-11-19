import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { add, max } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCadastralUnitGeneralDataSchema } from '../../../../utils/cadastralUnit/schemas/generalData';
import { getCadastralUnitInspectionSchema } from '../../../../utils/cadastralUnit/schemas/inspection';
import { EstateUnitActionCadastralUnit } from '../../EstateUnitAction/CadastralUnit/CadastralUnit';
import { EstateUnitMergeCadastralUnitStepProps } from './CadastralUnit.types';

export const EstateUnitMergeCadastralUnitStep = ({
  estateUnitMerge,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitMergeCadastralUnitStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const minDate = useMemo(() => {
    const minDates = estateUnitMerge.fromEstateUnits.reduce<Date[]>((acc, estateUnit) => {
      const minDate = parseStringToDate(estateUnit.currentCadastralUnit?.since);
      if (minDate) {
        return [...acc, minDate];
      }
      return acc;
    }, []);
    if (minDates.length === 0) {
      return undefined;
    }

    const minDate = max(minDates);
    return add(minDate, { days: 1 });
  }, [estateUnitMerge.fromEstateUnits]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnitMerge.toEstateUnit.cadastralUnit!,
    resolver: yupResolver(
      getCadastralUnitGeneralDataSchema(language, t, { minDate }).concat(getCadastralUnitInspectionSchema(language, t)),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitMerge,
        toEstateUnit: {
          ...estateUnitMerge.toEstateUnit,
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
        estateUnitInternalCode={estateUnitMerge.toEstateUnit.internalCode}
        setValue={setValue}
      />
    </StepForm>
  );
};
