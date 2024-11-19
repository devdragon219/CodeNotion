import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';
import { getCatalogueDocumentsSchema } from '../../../../utils/catalogue/schemas/documents';
import { CatalogueDocuments } from '../../../domains/Catalogue/Documents/Documents';
import { CatalogueDocumentsStepProps } from './Documents.types';

export const CatalogueDocumentsStep = ({
  catalogue,
  onBack,
  onChange,
  onError,
  onNext,
}: CatalogueDocumentsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CatalogueFormInput>({
    defaultValues: catalogue,
    resolver: yupResolver(getCatalogueDocumentsSchema(language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CatalogueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueDocuments control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
