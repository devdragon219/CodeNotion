import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractEstateUnitsSchema } from '../../../../utils/facilityContract/schemas/estateUnits';
import { FacilityContractEstateUnits } from '../../../domains/FacilityContract/EstateUnits/EstateUnits';
import { FacilityContractEstateUnitsStepProps } from './EstateUnits.types';

export const FacilityContractEstateUnitsStep = ({
  facilityContract,
  onBack,
  onChange,
  onError,
  onNext,
}: FacilityContractEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractEstateUnitsSchema(t)),
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
    if (errors.estateUnits) {
      onError(errors.estateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.estateUnits]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractEstateUnits control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
