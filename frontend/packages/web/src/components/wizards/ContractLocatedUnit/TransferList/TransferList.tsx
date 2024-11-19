import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput, ContractLocatedUnitFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getContractLocatedUnitsSchema } from '../../../../utils/contract/schemas/locatedUnits';
import { ContractLocatedUnitsTransferList } from '../../../domains/Contract/LocatedUnits/TransferList/TransferList';
import { ContractLocatedUnitsTransferListStepProps } from './TransferList.types';

export const ContractLocatedUnitsTransferListStep = ({
  currentLocatedUnits,
  isContractActive,
  locatedUnits,
  onChange,
  onError,
  onNext,
}: ContractLocatedUnitsTransferListStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: {
      locatedUnits,
    },
    resolver: yupResolver(getContractLocatedUnitsSchema(true, false, t)),
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

  useEffect(() => {
    if (errors.locatedUnits) {
      onError(errors.locatedUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.locatedUnits]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContractLocatedUnitsTransferList
        control={control}
        isContractActive={isContractActive}
        excludeIds={currentLocatedUnits.map(({ estateUnit, estateSubUnit }) =>
          isContractActive ? estateSubUnit!.id : estateUnit!.id,
        )}
        setValue={setValue}
      />
    </StepForm>
  );
};
