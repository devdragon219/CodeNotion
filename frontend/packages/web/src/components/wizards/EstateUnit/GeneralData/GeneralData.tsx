import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEstateUnit } from '../../../../hooks/useEstateUnit';
import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitGeneralDataSchema } from '../../../../utils/estateUnit/schemas/generalData';
import { EstateUnitGeneralData } from '../../../domains/EstateUnit/GeneralData/GeneralData';
import { EstateUnitGeneralDataStepProps } from './GeneralData.types';

export const EstateUnitGeneralDataStep = ({
  estateUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useEstateUnit();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnit,
    resolver: yupResolver(getEstateUnitGeneralDataSchema(language, t)),
  });

  useEffect(() => {
    if (estateUnit.internalCode === '') {
      getInternalCode(estateUnit.estate!.id, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

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
      <EstateUnitGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
