import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitOfficialActSchema } from '../../../../utils/estateUnit/schemas/officialAct';
import { EstateUnitOfficialAct } from '../../../domains/EstateUnit/OfficialAct/OfficialAct';
import { EstateUnitOfficialActStepProps } from './OfficialAct.types';

export const EstateUnitOfficialActStep = ({
  estateUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitOfficialActStepProps) => {
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
    resolver: yupResolver(getEstateUnitOfficialActSchema(language, t)),
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
      <EstateUnitOfficialAct control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
