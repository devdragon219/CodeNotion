import { yupResolver } from '@hookform/resolvers/yup';
import { ContactsField, StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { ContactsFieldValues } from '@realgimm5/frontend-common/interfaces';
import { getContactsSchema } from '@realgimm5/frontend-common/utils';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { OrgUnitContactsStepProps } from './Contacts.types';

export const OrgUnitContactsStep = ({ orgUnit, onBack, onChange, onError, onNext }: OrgUnitContactsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<OrgUnitFormInput>({
    defaultValues: orgUnit,
    resolver: yupResolver(getContactsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as OrgUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <ContactsField
        control={control as unknown as Control<ContactsFieldValues>}
        errors={errors}
        mode={FormMode.Create}
      />
    </StepForm>
  );
};
