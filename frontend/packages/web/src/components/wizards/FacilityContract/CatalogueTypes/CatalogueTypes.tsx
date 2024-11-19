import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractCatalogueTypesSchema } from '../../../../utils/facilityContract/schemas/catalogueTypes';
import { FacilityContractCatalogueTypes } from '../../../domains/FacilityContract/CatalogueTypes/CatalogueTypes';
import { FacilityContractCatalogueTypesStepProps } from './CatalogueTypes.types';

export const FacilityContractCatalogueTypesStep = ({
  facilityContract,
  onBack,
  onChange,
  onError,
  onNext,
}: FacilityContractCatalogueTypesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractCatalogueTypesSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractFormInput);
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
      <FacilityContractCatalogueTypes control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
