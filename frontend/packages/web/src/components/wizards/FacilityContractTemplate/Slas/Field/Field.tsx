import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { FacilityContractTemplateSlasField } from '../../../../domains/FacilityContractTemplate/SLAs/Field/Field';
import { FacilityContractTemplateSlasFieldSubStepProps } from './Field.types';

export const FacilityContractTemplateSlasFieldSubStep = ({
  facilityContractTemplate,
  onAddSlas,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractTemplateSlasFieldSubStepProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: facilityContractTemplate,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractTemplateFormInput);
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
      <FacilityContractTemplateSlasField
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddSlas={onAddSlas}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
