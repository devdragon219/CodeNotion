import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplateOnConditionMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/onConditionMaintenance';
import { TicketChecklistTemplateOnConditionMaintenance } from '../../../../domains/TicketChecklistTemplate/OnConditionMaintenance/OnConditionMaintenance';
import { TicketChecklistTemplateOnConditionMaintenanceFieldsSubStepProps } from './Fields.types';

export const TicketChecklistTemplateOnConditionMaintenanceFieldsSubStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplateOnConditionMaintenanceFieldsSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: ticketChecklistTemplate,
    resolver: yupResolver(getTicketChecklistTemplateOnConditionMaintenanceSchema(t, 'fields')),
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
      <TicketChecklistTemplateOnConditionMaintenance control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
