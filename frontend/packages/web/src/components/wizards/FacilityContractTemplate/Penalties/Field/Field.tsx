import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { FacilityContractTemplatePenaltiesField } from '../../../../domains/FacilityContractTemplate/Penalties/Field/Field';
import { FacilityContractTemplatePenaltiesFieldSubStepProps } from './Field.types';

export const FacilityContractTemplatePenaltiesFieldSubStep = ({
  facilityContractTemplate,
  onAddPenalties,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractTemplatePenaltiesFieldSubStepProps) => {
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
    if (errors.penalties) {
      onError(errors.penalties.message);
    }
    // eslint-disable-next-line
  }, [errors.penalties]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractTemplatePenaltiesField
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddPenalties={onAddPenalties}
        onOpenCalendar={onOpenCalendar}
      />
    </StepForm>
  );
};
