import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useServiceCategory } from '../../../../hooks/useServiceCategory';
import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';
import { getServiceCategoryGeneralDataSchema } from '../../../../utils/serviceCategory/schemas/generalData';
import { ServiceCategoryGeneralData } from '../../../domains/ServiceCategory/GeneralData/GeneralData';
import { ServiceCategoryGeneralDataStepProps } from './GeneralData.types';

export const ServiceCategoryGeneralDataStep = ({
  canUseInternalCode,
  serviceCategory,
  onChange,
  onError,
  onNext,
}: ServiceCategoryGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useServiceCategory();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ServiceCategoryFormInput>({
    defaultValues: serviceCategory,
    resolver: yupResolver(getServiceCategoryGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (serviceCategory.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ServiceCategoryFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ServiceCategoryGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
