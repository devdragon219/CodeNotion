import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUtilityType } from '../../../../hooks/useUtilityType';
import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';
import { getUtilityTypeGeneralDataSchema } from '../../../../utils/utilityType/schemas/generalData';
import { UtilityTypeGeneralData } from '../../../domains/UtilityType/GeneralData/GeneralData';
import { UtilityTypeGeneralDataStepProps } from './GeneralData.types';

export const UtilityTypeGeneralDataStep = ({
  canUseInternalCode,
  utilityType,
  onChange,
  onError,
  onNext,
}: UtilityTypeGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useUtilityType();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UtilityTypeFormInput>({
    defaultValues: utilityType,
    resolver: yupResolver(getUtilityTypeGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (utilityType.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UtilityTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <UtilityTypeGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
