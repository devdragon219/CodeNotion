import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistsFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';
import { getTicketChecklistsEstateUnitsSchema } from '../../../../utils/ticketChecklist/schemas/ticketChecklists';
import { TicketChecklistsEstateUnitsStepProps } from './EstateUnits.types';
import { EstateUnitsTransferList } from './TransferList/TransferList';

export const TicketChecklistsEstateUnitsStep = ({
  estateUnits,
  ticketChecklists,
  onChange,
  onError,
  onNext,
}: TicketChecklistsEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketChecklistsFormInput>({
    defaultValues: ticketChecklists,
    resolver: yupResolver(getTicketChecklistsEstateUnitsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketChecklistsFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.estateUnits) {
      onError(errors.estateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.estateUnits]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitsTransferList control={control} estateUnits={estateUnits} />
    </StepForm>
  );
};
