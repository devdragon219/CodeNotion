import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartTakeoverVariationTakeoverCounterpartsSchema } from '../../../../../utils/contractActions/schemas/counterpartTakeover';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { TakeoverCounterpartsStepProps } from './TakeoverCounterparts.types';

export const TakeoverCounterpartsStep = ({
  counterpartTakeover,
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
  } = useForm<ContractCounterpartVariationTakeoverFormInput>({
    defaultValues: counterpartTakeover,
    resolver: yupResolver(getContractCounterpartTakeoverVariationTakeoverCounterpartsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationTakeoverFormInput);
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
            since={counterpartTakeover.takeoverDate}
            titles={{
              left: 'contract.section_title.takeover_counterparts',
              right: 'contract.section_title.selected_takeover_counterparts',
            }}
          />
        )}
      />
    </StepForm>
  );
};
