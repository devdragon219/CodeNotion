import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplatePreventativeMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/preventativeMaintenance';
import { TicketChecklistTemplatePreventativeMaintenance } from '../../../../domains/TicketChecklistTemplate/PreventativeMaintenance/PreventativeMaintenance';
import { TicketChecklistTemplatePreventativeMaintenanceFieldsSubStepProps } from './Fields.types';

export const TicketChecklistTemplatePreventativeMaintenanceFieldsSubStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplatePreventativeMaintenanceFieldsSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: ticketChecklistTemplate,
    resolver: yupResolver(getTicketChecklistTemplatePreventativeMaintenanceSchema(t, 'fields')),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketChecklistTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TicketChecklistTemplatePreventativeMaintenance
        control={control}
        errors={errors}
        mode={FormMode.Create}
        setValue={setValue}
      />
    </StepForm>
  );
};
