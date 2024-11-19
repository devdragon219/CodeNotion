import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { getCatalogueTypeFieldsSchema } from '../../../../utils/catalogueType/schemas/fields';
import { CatalogueTypeFields } from '../../../domains/CatalogueType/Fields/Fields';
import { CatalogueTypeFieldsStepProps } from './Fields.types';

export const CatalogueTypeFieldsStep = ({
  catalogueType,
  onBack,
  onChange,
  onError,
  onNext,
}: CatalogueTypeFieldsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CatalogueTypeFormInput>({
    defaultValues: catalogueType,
    resolver: yupResolver(getCatalogueTypeFieldsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CatalogueTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.fields) {
      onError(errors.fields.message);
    }
    // eslint-disable-next-line
  }, [errors.fields]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueTypeFields control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
