import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { getContactsSchema } from '@realgimm5/frontend-common/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { UserContacts } from '../../../domains/User/Contacts/Contacts';
import { UserContactsStepProps } from './Contacts.types';

export const UserContactsStep = ({ user, onBack, onChange, onError, onNext }: UserContactsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UserFormInput>({
    defaultValues: user,
    resolver: yupResolver(getContactsSchema(t)),
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
      <UserContacts mode={FormMode.Create} control={control} errors={errors} />
    </StepForm>
  );
};
