import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTicketChecklistTemplate } from '../../../../hooks/useTicketChecklistTemplate';
import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplateGeneralDataSchema } from '../../../../utils/ticketChecklistTemplate/schemas/generalData';
import { TicketChecklistTemplateGeneralData } from '../../../domains/TicketChecklistTemplate/GeneralData/GeneralData';
import { TicketChecklistTemplateGeneralDataStepProps } from './GeneralData.types';

export const TicketChecklistTemplateGeneralDataStep = ({
  canUseInternalCode,
  ticketChecklistTemplate,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplateGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useTicketChecklistTemplate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: ticketChecklistTemplate,
    resolver: yupResolver(getTicketChecklistTemplateGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (ticketChecklistTemplate.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketChecklistTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TicketChecklistTemplateGeneralData control={control} errors={errors} setValue={setValue} />
    </StepForm>
  );
};
