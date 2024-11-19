import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getSubjectPersonalDataSchema } from '../../../../utils/subject/schemas/personalData';
import { SubjectPersonalData } from '../../../domains/Subject/PersonalData/PersonalData';
import { SubjectPersonalDataStepProps } from './PersonalData.types';

export const SubjectPersonalDataStep = ({
  canBeGroupLeader,
  canUseInterGroupSignature,
  isBirthTaxIdCodeValid,
  subject,
  subjectType,
  onBack,
  onChange,
  onError,
  onNext,
}: SubjectPersonalDataStepProps) => {
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
  } = useForm<SubjectFormInput>({
    defaultValues: subject,
    resolver: yupResolver(
      getSubjectPersonalDataSchema(
        canBeGroupLeader,
        canUseInterGroupSignature,
        subject.entryStatus,
        isBirthTaxIdCodeValid,
        language,
        subject.legalNature,
        subjectType,
        t,
      ),
    ),
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
      <SubjectPersonalData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        subjectType={subjectType}
        setValue={setValue}
      />
    </StepForm>
  );
};
