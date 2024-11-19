import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEstateDocumentsAndImagesSchema } from '../../../../utils/estate/schemas/documents';
import { EstateDocuments } from '../../../domains/Estate/Documents/Documents';
import { EstateDocumentsStepProps } from './Documents.types';

export const EstateDocumentsStep = ({ estate, onBack, onChange, onError, onNext }: EstateDocumentsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateFormInput>({
    defaultValues: estate,
    resolver: yupResolver(getEstateDocumentsAndImagesSchema(language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateDocuments control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
