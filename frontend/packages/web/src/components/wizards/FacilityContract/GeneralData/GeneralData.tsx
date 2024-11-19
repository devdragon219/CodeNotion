import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFacilityContract } from '../../../../hooks/useFacilityContract';
import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractGeneralDataSchema } from '../../../../utils/facilityContract/schemas/generalData';
import { FacilityContractGeneralData } from '../../../domains/FacilityContract/GeneralData/GeneralData';
import { FacilityContractGeneralDataStepProps } from './GeneralData.types';

export const FacilityContractGeneralDataStep = ({
  canUseInternalCode,
  facilityContract,
  onChange,
  onError,
  onNext,
}: FacilityContractGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useFacilityContract();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractGeneralDataSchema(canUseInternalCode, language, t)),
  });

  useEffect(() => {
    if (facilityContract.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
