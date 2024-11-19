import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';
import { getCatalogueGeneralDataSchema } from '../../../../utils/catalogue/schemas/generalData';
import { CatalogueGeneralData } from '../../../domains/Catalogue/GeneralData/GeneralData';
import { CatalogueGeneralDataStepProps } from './GeneralData.types';

export const CatalogueGeneralDataStep = ({
  catalogue,
  onBack,
  onChange,
  onError,
  onNext,
}: CatalogueGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CatalogueFormInput>({
    defaultValues: catalogue,
    resolver: yupResolver(getCatalogueGeneralDataSchema(t)),
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
      <CatalogueGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
