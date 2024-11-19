import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartTransferVariationTakeoverCounterpartsSchema } from '../../../../../utils/contractActions/schemas/counterpartTransfer';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { TakeoverCounterpartsStepProps } from './TakeoverCounterparts.types';

export const TakeoverCounterpartsStep = ({
  counterpartTransfer,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: TakeoverCounterpartsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationTransferFormInput>({
    defaultValues: counterpartTransfer,
    resolver: yupResolver(getContractCounterpartTransferVariationTakeoverCounterpartsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationTransferFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.takeoverCounterparts) {
      onError(errors.takeoverCounterparts.message);
    }
    // eslint-disable-next-line
  }, [errors.takeoverCounterparts]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Controller
        name="takeoverCounterparts"
        control={control}
        render={({ field }) => (
          <ContractCounterpartsTransferList
            {...field}
            excludeSubjectIds={currentCounterparts.reduce<number[]>(
              (acc, { subject }) => (subject ? [...acc, subject.id] : acc),
              [],
            )}
            isContractActive={isContractActive}
            since={counterpartTransfer.takeoverDate}
            titles={{
              left: 'contract.section_title.takeover_transfer_counterparts',
              right: 'contract.section_title.selected_takeover_transfer_counterparts',
            }}
          />
        )}
      />
    </StepForm>
  );
};
