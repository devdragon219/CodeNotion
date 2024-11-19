import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getSubjectAccountingDataSchema } from '../../../../utils/subject/schemas/accountingData';
import { SubjectAccountingData } from '../../../domains/Subject/AccountingData/AccountingData';
import { SubjectAccountingDataStepProps } from './AccountingData.types';

export const SubjectAccountingDataStep = ({
  subject,
  onBack,
  onChange,
  onError,
  onNext,
}: SubjectAccountingDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SubjectFormInput>({
    defaultValues: subject,
    resolver: yupResolver(getSubjectAccountingDataSchema(subject.entryStatus, language, t)),
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
      <SubjectAccountingData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};