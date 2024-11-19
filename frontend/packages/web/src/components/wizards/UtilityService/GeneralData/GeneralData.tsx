import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUtilityService } from '../../../../hooks/useUtilityService';
import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { getUtilityServiceGeneralDataSchema } from '../../../../utils/utilityService/schemas/generalData';
import { UtilityServiceGeneralData } from '../../../domains/UtilityService/GeneralData/GeneralData';
import { UtilityServiceGeneralDataStepProps } from './GeneralData.types';

export const UtilityServiceGeneralDataStep = ({
  canUseInternalCode,
  utilityService,
  onChange,
  onError,
  onNext,
}: UtilityServiceGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useUtilityService();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UtilityServiceFormInput>({
    defaultValues: utilityService,
    resolver: yupResolver(getUtilityServiceGeneralDataSchema(canUseInternalCode, language, t)),
  });

  useEffect(() => {
    if (utilityService.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UtilityServiceFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <UtilityServiceGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
