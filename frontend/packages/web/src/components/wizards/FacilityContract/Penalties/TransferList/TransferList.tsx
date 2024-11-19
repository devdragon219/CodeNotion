import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { FacilityContractPenaltiesTransferList } from '../../../../domains/FacilityContract/Penalties/TransferList/TransferList';
import { FacilityContractPenaltiesTransferListSubStepProps } from './TransferList.types';

export const FacilityContractPenaltiesTransferListSubStep = ({
  facilityContract,
  onAddPenalties,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractPenaltiesTransferListSubStepProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
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
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractPenaltiesTransferList
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddPenalties={onAddPenalties}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
