import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { getTaxConfigTableSchema } from '../../../../utils/components/taxConfig/schemas/taxConfigTable';
import { TaxConfigGeneralData } from '../../../domains/TaxConfig/GeneralData/GeneralData';
import { TaxConfigGeneralDataStepProps } from './GeneralData.types';

export const TaxConfigGeneralDataStep = ({
  canCreateTaxConfigTableValue,
  config,
  onChange,
  onError,
  onNext,
}: TaxConfigGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TaxConfigFormInput>({
    defaultValues: config,
    resolver: yupResolver(getTaxConfigTableSchema(t, canCreateTaxConfigTableValue)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TaxConfigFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TaxConfigGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
