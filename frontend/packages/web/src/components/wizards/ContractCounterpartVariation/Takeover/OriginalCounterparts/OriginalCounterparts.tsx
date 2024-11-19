import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartTakeoverVariationOriginalCounterpartsSchema } from '../../../../../utils/contractActions/schemas/counterpartTakeover';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { OriginalCounterpartsStepProps } from './OriginalCounterparts.types';

export const OriginalCounterpartsStep = ({
  counterpartTakeover,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: OriginalCounterpartsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationTakeoverFormInput>({
    defaultValues: counterpartTakeover,
    resolver: yupResolver(getContractCounterpartTakeoverVariationOriginalCounterpartsSchema(t)),
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
    if (errors.originalCounterparts) {
      onError(errors.originalCounterparts.message);
    }
    // eslint-disable-next-line
  }, [errors.originalCounterparts]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Controller
        name="originalCounterparts"
        control={control}
        render={({ field }) => (
          <ContractCounterpartsTransferList
            {...field}
            counterparts={currentCounterparts}
            isContractActive={isContractActive}
            titles={{
              left: 'contract.section_title.original_counterparts',
              right: 'contract.section_title.selected_original_counterparts',
            }}
          />
        )}
      />
    </StepForm>
  );
};
