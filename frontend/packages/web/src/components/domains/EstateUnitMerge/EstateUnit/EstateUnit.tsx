import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { add, max } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitGeneralDataSchema } from '../../../../utils/estateUnit/schemas/generalData';
import { EstateUnitActionEstateUnit } from '../../EstateUnitAction/EstateUnit/EstateUnit';
import { EstateUnitMergeEstateUnitStepProps } from './EstateUnit.types';

export const EstateUnitMergeEstateUnitStep = ({
  estateUnitMerge,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitMergeEstateUnitStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const minDate = useMemo(() => {
    const minDates = estateUnitMerge.fromEstateUnits.reduce<Date[]>((acc, estateUnit) => {
      const minDate = parseStringToDate(estateUnit.ownershipStartDate);
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
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnitMerge.toEstateUnit,
    resolver: yupResolver(getEstateUnitGeneralDataSchema(language, t, minDate)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionEstateUnit
        control={control}
        errors={errors}
        estateId={estateUnitMerge.toEstateUnit.estate!.id}
        setValue={setValue}
      />
    </StepForm>
  );
};
