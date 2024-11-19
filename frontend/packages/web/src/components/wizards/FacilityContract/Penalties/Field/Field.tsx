import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractPenaltiesSchema } from '../../../../../utils/facilityContract/schemas/penalties';
import { FacilityContractPenaltiesField } from '../../../../domains/FacilityContract/Penalties/Field/Field';
import { FacilityContractPenaltiesFieldSubStepProps } from './Field.types';

export const FacilityContractPenaltiesFieldSubStep = ({
  facilityContract,
  onAddPenalties,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractPenaltiesFieldSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractPenaltiesSchema(t)),
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
    if (errors.penalties) {
      onError(errors.penalties.message);
    }
    // eslint-disable-next-line
  }, [errors.penalties]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractPenaltiesField
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddPenalties={onAddPenalties}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
