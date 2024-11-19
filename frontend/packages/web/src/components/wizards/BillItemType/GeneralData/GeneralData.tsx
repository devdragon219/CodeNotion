import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useBillItemType } from '../../../../hooks/useBillItemType';
import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';
import { getBillItemTypeGeneralDataSchema } from '../../../../utils/billItemType/schemas/generalData';
import { BillItemTypeGeneralData } from '../../../domains/BillItemType/GeneralData/GeneralData';
import { BillItemTypeGeneralDataStepProps } from './GeneralData.types';

export const BillItemTypeGeneralDataStep = ({
  billItemType,
  canUseInternalCode,
  onChange,
  onError,
  onNext,
}: BillItemTypeGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useBillItemType();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<BillItemTypeFormInput>({
    defaultValues: billItemType,
    resolver: yupResolver(getBillItemTypeGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (billItemType.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as BillItemTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <BillItemTypeGeneralData control={control} errors={errors} />
    </StepForm>
  );
};
