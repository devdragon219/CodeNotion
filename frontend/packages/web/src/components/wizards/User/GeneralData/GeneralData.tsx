import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { getUserGeneralDataSchema } from '../../../../utils/user/schemas/generalData';
import { UserGeneralData } from '../../../domains/User/GeneralData/GeneralData';
import { UserGeneralDataStepProps } from './GeneralData.types';

export const UserGeneralDataStep = ({ canUseUserName, user, onChange, onError, onNext }: UserGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UserFormInput>({
    defaultValues: user,
    resolver: yupResolver(getUserGeneralDataSchema(canUseUserName, language, t, user.status)),
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
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <UserGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
