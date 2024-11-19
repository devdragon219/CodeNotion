import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getSubjectAddressesAndContactsSchema } from '../../../../utils/subject/schemas/addressesAndContacts';
import { SubjectAddressesAndContacts } from '../../../domains/Subject/AddressesAndContacts/AddressesAndContacts';
import { SubjectAddressesAndContactsStepProps } from './AddressesAndContacts.types';

export const SubjectAddressesAndContactsStep = ({
  subject,
  onBack,
  onChange,
  onError,
  onNext,
}: SubjectAddressesAndContactsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<SubjectFormInput>({
    defaultValues: subject,
    resolver: yupResolver(getSubjectAddressesAndContactsSchema(subject.entryStatus, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as SubjectFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <SubjectAddressesAndContacts control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
