import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationAddFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartAddVariationNewCounterpartsSchema } from '../../../../../utils/contractActions/schemas/counterpartAdd';
import { ContractCounterpartsTransferList } from '../../../../domains/Contract/Counterparts/TransferList/TransferList';
import { NewCounterpartsStepProps } from './NewCounterparts.types';

export const NewCounterpartsStep = ({
  counterpartAdd,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: NewCounterpartsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationAddFormInput>({
    defaultValues: counterpartAdd,
    resolver: yupResolver(getContractCounterpartAddVariationNewCounterpartsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationAddFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.newCounterparts) {
      onError(errors.newCounterparts.message);
    }
    // eslint-disable-next-line
  }, [errors.newCounterparts]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Controller
        name="newCounterparts"
        control={control}
        render={({ field }) => (
          <ContractCounterpartsTransferList
            {...field}
            excludeSubjectIds={currentCounterparts.reduce<number[]>(
              (acc, { subject }) => (subject ? [...acc, subject.id] : acc),
              [],
            )}
            isContractActive={isContractActive}
            titles={{
              left: `contract.section_title.counterparts_${isContractActive ? 'tenant' : 'landlord'}`,
              right: `contract.section_title.selected_counterparts_${isContractActive ? 'tenant' : 'landlord'}`,
            }}
          />
        )}
      />
    </StepForm>
  );
};
