import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { getCatalogueCategorySubCategoriesSchema } from '../../../../utils/catalogueCategory/schemas/subCategories';
import { CatalogueCategorySubCategories } from '../../../domains/CatalogueCategory/SubCategories/SubCategories';
import { CatalogueCategorySubCategoriesStepProps } from './SubCategories.types';

export const CatalogueCategorySubcategoriesStep = ({
  canUseInternalCodes,
  catalogueCategory,
  onBack,
  onError,
  onSave,
  setCanUseInternalCodes,
}: CatalogueCategorySubCategoriesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CatalogueCategoryFormInput>({
    defaultValues: catalogueCategory,
    resolver: yupResolver(getCatalogueCategorySubCategoriesSchema(canUseInternalCodes, t)),
  });

  const onSubmit = useCallback(
    (catalogueCategory: CatalogueCategoryFormInput) => {
      onSave(catalogueCategory);
    },
    [onSave],
  );

  return (
    <StepForm
      completeLabel="catalogue_category.dialog.create.save"
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CatalogueCategorySubCategories
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
