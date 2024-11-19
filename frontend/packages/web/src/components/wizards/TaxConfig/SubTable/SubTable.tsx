import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { getTaxConfigSubTableSchema } from '../../../../utils/components/taxConfig/schemas/taxConfigSubTable';
import { TaxConfigSubTable } from '../../../domains/TaxConfig/SubTable/SubTable';
import { TaxConfigSubTableStepProps } from './SubTable.types';

export const TaxConfigSubTableStep = ({
  calculator,
  config,
  subTable,
  onBack,
  onChange,
  onError,
  onNext,
}: TaxConfigSubTableStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TaxConfigFormInput>({
    defaultValues: config,
    resolver: yupResolver(getTaxConfigSubTableSchema(subTable.code, t, 1)),
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

  useEffect(() => {
    if (errors.subTables?.[subTable.code]?.root) {
      onError(errors.subTables[subTable.code]?.root?.message);
    }
    // eslint-disable-next-line
  }, [errors.subTables?.[subTable.code]?.root]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TaxConfigSubTable
        calculator={calculator}
        control={control}
        errors={errors}
        mode={FormMode.Create}
        subTable={subTable}
      />
    </StepForm>
  );
};
