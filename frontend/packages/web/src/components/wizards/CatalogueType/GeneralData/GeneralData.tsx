import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCatalogueType } from '../../../../hooks/useCatalogueType';
import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { getCatalogueTypeGeneralDataSchema } from '../../../../utils/catalogueType/schemas/generalData';
import { CatalogueTypeGeneralData } from '../../../domains/CatalogueType/GeneralData/GeneralData';
import { CatalogueTypeGeneralDataStepProps } from './GeneralData.types';

export const CatalogueTypeGeneralDataStep = ({
  canUseInternalCode,
  catalogueType,
  onAddCatalogueCategory,
  onAddCatalogueSubCategory,
  onChange,
  onError,
  onNext,
}: CatalogueTypeGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useCatalogueType();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CatalogueTypeFormInput>({
    defaultValues: catalogueType,
    resolver: yupResolver(getCatalogueTypeGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (catalogueType.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CatalogueTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueTypeGeneralData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddCatalogueCategory={onAddCatalogueCategory}
        onAddCatalogueSubCategory={onAddCatalogueSubCategory}
        setValue={setValue}
      />
    </StepForm>
  );
};
