import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitInspectionSchema } from '../../../../utils/cadastralUnit/schemas/inspection';
import { CadastralUnitInspection } from '../../../domains/CadastralUnit/Inspection/Inspection';
import { CadastralUnitInspectionStepProps } from './Inspection.types';

export const CadastralUnitInspectionStep = ({
  cadastralUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: CadastralUnitInspectionStepProps) => {
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
  } = useForm<CadastralUnitFormInput>({
    defaultValues: cadastralUnit,
    resolver: yupResolver(getCadastralUnitInspectionSchema(language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CadastralUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CadastralUnitInspection control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
