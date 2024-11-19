import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';
import { getUtilityTypeFieldsSchema } from '../../../../utils/utilityType/schemas/fields';
import { UtilityTypeFields } from '../../../domains/UtilityType/Fields/Fields';
import { UtilityTypeFieldsStepProps } from './Fields.types';

export const UtilityTypeFieldsStep = ({
  utilityType,
  onBack,
  onChange,
  onError,
  onNext,
}: UtilityTypeFieldsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UtilityTypeFormInput>({
    defaultValues: utilityType,
    resolver: yupResolver(getUtilityTypeFieldsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UtilityTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.fields) {
      onError(errors.fields.message);
    }
    // eslint-disable-next-line
  }, [errors.fields]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <UtilityTypeFields control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
