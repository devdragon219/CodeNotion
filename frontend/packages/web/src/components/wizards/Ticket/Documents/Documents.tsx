import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketDocumentsAndImagesSchema } from '../../../../utils/ticket/schemas/documents';
import { TicketDocuments } from '../../../domains/Ticket/Documents/Documents';
import { TicketDocumentsStepProps } from './Documents.types';

export const TicketDocumentsStep = ({ ticket, onBack, onChange, onError, onNext }: TicketDocumentsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketDocumentsAndImagesSchema(language, t)),
  });

  useEffect(() => {
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
      <TicketDocuments control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
