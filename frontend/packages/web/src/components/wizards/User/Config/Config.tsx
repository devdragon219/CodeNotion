import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { getUserConfigSchema } from '../../../../utils/user/schemas/config';
import { UserConfig } from '../../../domains/User/Config/Config';
import { UserConfigStepProps } from './Config.types';

export const UserConfigStep = ({ user, onBack, onChange, onError, onNext }: UserConfigStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UserFormInput>({
    defaultValues: user,
    resolver: yupResolver(getUserConfigSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UserFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <UserConfig control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
