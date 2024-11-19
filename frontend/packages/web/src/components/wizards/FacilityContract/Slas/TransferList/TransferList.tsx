import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { FacilityContractSlasTransferList } from '../../../../domains/FacilityContract/SLAs/TransferList/TransferList';
import { FacilityContractSlasTransferListSubStepProps } from './TransferList.types';

export const FacilityContractSlasTransferListSubStep = ({
  facilityContract,
  onAddSlas,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractSlasTransferListSubStepProps) => {
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
    if (errors.slas) {
      onError(errors.slas.message);
    }
    // eslint-disable-next-line
  }, [errors.slas]);

  return (
    <StepForm sx={{ height: 'calc(100% - 160px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractSlasTransferList
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddSlas={onAddSlas}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
