import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitDocumentsSchema } from '../../../../utils/estateUnit/schemas/documents';
import { EstateUnitDocuments } from '../../../domains/EstateUnit/Documents/Documents';
import { EstateUnitDocumentsStepProps } from './Documents.types';

export const EstateUnitDocumentsStep = ({
  estateUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitDocumentsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnit,
    resolver: yupResolver(getEstateUnitDocumentsSchema(language, t)),
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
      <EstateUnitDocuments control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
