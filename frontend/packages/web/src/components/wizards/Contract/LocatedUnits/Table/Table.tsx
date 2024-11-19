import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractLocatedUnitsSchema } from '../../../../../utils/contract/schemas/locatedUnits';
import { ContractLocatedUnitsTable } from '../../../../domains/Contract/LocatedUnits/Table/Table';
import { ContractLocatedUnitsTableSubStepProps } from './Table.types';

export const ContractLocatedUnitsTableSubStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractLocatedUnitsTableSubStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractLocatedUnitsSchema(isContractActive, true, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.locatedUnits?.root) {
      onError(errors.locatedUnits.root.message);
    }
    // eslint-disable-next-line
  }, [errors.locatedUnits?.root]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractLocatedUnitsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
