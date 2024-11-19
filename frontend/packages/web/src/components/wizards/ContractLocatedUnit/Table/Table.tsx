import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput, ContractLocatedUnitFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractLocatedUnitsSchema } from '../../../../utils/contract/schemas/locatedUnits';
import { ContractLocatedUnitsTable } from '../../../domains/Contract/LocatedUnits/Table/Table';
import { ContractLocatedUnitsTableStepProps } from './Table.types';

export const ContractLocatedUnitsTableStep = ({
  locatedUnits,
  isContractActive,
  onBack,
  onChange,
  onError,
  onSave,
}: ContractLocatedUnitsTableStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: {
      locatedUnits,
    },
    resolver: yupResolver(getContractLocatedUnitsSchema(true, true, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ locatedUnits }) => {
      onChange(locatedUnits as ContractLocatedUnitFormInput[]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleSave = useCallback(
    ({ locatedUnits }: ContractFormInput) => {
      onSave(locatedUnits);
    },
    [onSave],
  );

  return (
    <StepForm onBack={onBack} onComplete={onError} onSubmit={handleSubmit(handleSave)}>
      <ContractLocatedUnitsTable
        control={control}
        errors={errors}
        isContractActive={isContractActive}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
