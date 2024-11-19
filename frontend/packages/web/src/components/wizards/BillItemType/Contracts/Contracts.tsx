import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';
import { getBillItemTypeContractSchema } from '../../../../utils/billItemType/schemas/contracts';
import { BillItemTypeRates } from '../../../domains/BillItemType/Rates/Rates';
import { BillItemTypeContractsStepProps } from './Contracts.types';

export const BillItemTypeContractsStep = ({
  billItemType,
  onChange,
  onBack,
  onError,
  onNext,
}: BillItemTypeContractsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<BillItemTypeFormInput>({
    defaultValues: billItemType,
    resolver: yupResolver(getBillItemTypeContractSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as BillItemTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <BillItemTypeRates control={control} errors={errors} setValue={setValue} />
    </StepForm>
  );
};
