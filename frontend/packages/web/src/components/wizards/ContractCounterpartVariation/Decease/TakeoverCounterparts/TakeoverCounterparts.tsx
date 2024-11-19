import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationDeceaseFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartDeceaseVariationTakeoverCounterpartsSchema } from '../../../../../utils/contractActions/schemas/counterpartDecease';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { TakeoverCounterpartsStepProps } from './TakeoverCounterparts.types';

export const TakeoverCounterpartsStep = ({
  counterpartDecease,
  isContractActive,
  onAddHeir,
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
  } = useForm<ContractCounterpartVariationDeceaseFormInput>({
    defaultValues: counterpartDecease,
    resolver: yupResolver(getContractCounterpartDeceaseVariationTakeoverCounterpartsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationDeceaseFormInput);
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
            includeSubjectRelationId={counterpartDecease.originalCounterpart!.subject!.id}
            isContractActive={isContractActive}
            titles={{
              left: 'contract.section_title.select_heirs',
              right: 'contract.section_title.selected_heirs',
            }}
            onAdd={{
              label: 'contract.action.add_heir',
              onClick: onAddHeir,
            }}
          />
        )}
      />
    </StepForm>
  );
};
