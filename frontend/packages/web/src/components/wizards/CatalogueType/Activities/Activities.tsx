import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { getCatalogueTypeActivitiesSchema } from '../../../../utils/catalogueType/schemas/activities';
import { CatalogueTypeActivities } from '../../../domains/CatalogueType/Activities/Activities';
import { CatalogueTypeActivitiesStepProps } from './Activities.types';

export const CatalogueTypeActivitiesStep = ({
  catalogueType,
  onBack,
  onChange,
  onError,
  onNext,
}: CatalogueTypeActivitiesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CatalogueTypeFormInput>({
    defaultValues: catalogueType,
    resolver: yupResolver(getCatalogueTypeActivitiesSchema(t)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueTypeActivities control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
