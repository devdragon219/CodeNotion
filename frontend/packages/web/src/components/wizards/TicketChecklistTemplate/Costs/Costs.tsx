import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplateCostsSchema } from '../../../../utils/ticketChecklistTemplate/schemas/costs';
import { TicketChecklistTemplateCosts } from '../../../domains/TicketChecklistTemplate/Costs/Costs';
import { TicketChecklistTemplateCostsStepProps } from './Costs.types';

export const TicketChecklistTemplateCostsStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplateCostsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: ticketChecklistTemplate,
    resolver: yupResolver(getTicketChecklistTemplateCostsSchema(t)),
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
      <TicketChecklistTemplateCosts control={control} errors={errors} />
    </StepForm>
  );
};
