import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';
import { getFacilityContractTemplateCatalogueTypesSchema } from '../../../../utils/facilityContractTemplate/schemas/catalogueTypes';
import { FacilityContractTemplateCatalogueTypes } from '../../../domains/FacilityContractTemplate/CatalogueTypes/CatalogueTypes';
import { FacilityContractTemplateCatalogueTypesStepProps } from './CatalogueTypes.types';

export const FacilityContractTemplateCatalogueTypesStep = ({
  facilityContractTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: FacilityContractTemplateCatalogueTypesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: facilityContractTemplate,
    resolver: yupResolver(getFacilityContractTemplateCatalogueTypesSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.catalogueTypes) {
      onError(errors.catalogueTypes.message);
    }
    // eslint-disable-next-line
  }, [errors.catalogueTypes]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractTemplateCatalogueTypes control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
