import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTicket } from '../../../../hooks/useTicket';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketGeneralDataSchema } from '../../../../utils/ticket/schemas/generalData';
import { TicketGeneralData } from '../../../domains/Ticket/GeneralData/GeneralData';
import { TicketGeneralDataStepProps } from './GeneralData.types';

export const TicketGeneralDataStep = ({
  canUseInternalCode,
  ticket,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useTicket();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketGeneralDataSchema(canUseInternalCode, language, FormMode.Create, t)),
  });

  useEffect(() => {
    if (ticket.internalCode === '') {
      getInternalCode(ticket.mainType, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TicketGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
