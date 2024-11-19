import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplateOnConditionMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/onConditionMaintenance';
import { TicketChecklistTemplateOnConditionMaintenanceActivities } from '../../../../domains/TicketChecklistTemplate/OnConditionMaintenanceActivities/OnConditionMaintenanceActivities';
import { TicketChecklistTemplateOnConditionMaintenanceActivitiesSubStepProps } from './Activities.types';

export const TicketChecklistTemplateOnConditionMaintenanceActivitiesSubStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplateOnConditionMaintenanceActivitiesSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: ticketChecklistTemplate,
    resolver: yupResolver(getTicketChecklistTemplateOnConditionMaintenanceSchema(t, 'activities')),
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

  useEffect(() => {
    if (errors.onCondition?.activities) {
      onError(errors.onCondition.activities.message);
    }
    // eslint-disable-next-line
  }, [errors.onCondition?.activities]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TicketChecklistTemplateOnConditionMaintenanceActivities
        control={control}
        errors={errors}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
