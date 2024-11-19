import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';
import { getServiceCategorySubCategoriesSchema } from '../../../../utils/serviceCategory/schemas/subCategories';
import { ServiceCategorySubCategories } from '../../../domains/ServiceCategory/SubCategories/SubCategories';
import { ServiceCategorySubCategoriesStepProps } from './SubCategories.types';

export const ServiceCategorySubCategoriesStep = ({
  canUseInternalCodes,
  serviceCategory,
  onBack,
  onError,
  onSave,
  setCanUseInternalCodes,
}: ServiceCategorySubCategoriesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ServiceCategoryFormInput>({
    defaultValues: serviceCategory,
    resolver: yupResolver(getServiceCategorySubCategoriesSchema(canUseInternalCodes, t)),
  });

  const onSubmit = useCallback(
    (serviceCategory: ServiceCategoryFormInput) => {
      onSave(serviceCategory);
    },
    [onSave],
  );

  return (
    <StepForm
      completeLabel="service_category.dialog.create.save"
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ServiceCategorySubCategories
        canUseInternalCodes={canUseInternalCodes}
        control={control}
        errors={errors}
        mode={FormMode.Create}
        setCanUseInternalCodes={setCanUseInternalCodes}
        setValue={setValue}
      />
    </StepForm>
  );
};
