import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractSlasSchema } from '../../../../../utils/facilityContract/schemas/slas';
import { FacilityContractSlasField } from '../../../../domains/FacilityContract/SLAs/Field/Field';
import { FacilityContractSlasFieldSubStepProps } from './Field.types';

export const FacilityContractSlasFieldSubStep = ({
  facilityContract,
  onAddSlas,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractSlasFieldSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractSlasSchema(t)),
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
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractSlasField
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddSlas={onAddSlas}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
