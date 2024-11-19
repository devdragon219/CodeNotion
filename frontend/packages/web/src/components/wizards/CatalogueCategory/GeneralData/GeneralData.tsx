import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCatalogueCategory } from '../../../../hooks/useCatalogueCategory';
import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { getCatalogueCategoryGeneralDataSchema } from '../../../../utils/catalogueCategory/schemas/generalData';
import { CatalogueCategoryGeneralData } from '../../../domains/CatalogueCategory/GeneralData/GeneralData';
import { CatalogueCategoryGeneralDataStepProps } from './GeneralData.types';

export const CatalogueCategoryGeneralDataStep = ({
  canUseInternalCode,
  catalogueCategory,
  onChange,
  onError,
  onNext,
}: CatalogueCategoryGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useCatalogueCategory();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CatalogueCategoryFormInput>({
    defaultValues: catalogueCategory,
    resolver: yupResolver(getCatalogueCategoryGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (catalogueCategory.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CatalogueCategoryFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueCategoryGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
