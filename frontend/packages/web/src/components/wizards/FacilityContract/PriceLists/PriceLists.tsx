import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractPriceListsSchema } from '../../../../utils/facilityContract/schemas/priceLists';
import { FacilityContractPriceLists } from '../../../domains/FacilityContract/PriceLists/PriceLists';
import { FacilityContractPriceListsStepProps } from './PriceLists.types';

export const FacilityContractPriceListsStep = ({
  facilityContract,
  onBack,
  onChange,
  onError,
  onNext,
}: FacilityContractPriceListsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FacilityContractFormInput>({
    defaultValues: facilityContract,
    resolver: yupResolver(getFacilityContractPriceListsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.priceLists) {
      onError(errors.priceLists.message);
    }
    // eslint-disable-next-line
  }, [errors.priceLists]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractPriceLists control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
