import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useSubject } from '../../../../hooks/useSubject';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getSubjectGeneralDataSchema } from '../../../../utils/subject/schemas/generalData';
import { SubjectGeneralData } from '../../../domains/Subject/GeneralData/GeneralData';
import { SubjectGeneralDataStepProps } from './GeneralData.types';

export const SubjectGeneralDataStep = ({
  canUseInternalCode,
  isLegalNatureDisabled,
  subject,
  subjectType,
  onChange,
  onError,
  onNext,
}: SubjectGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useSubject();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<SubjectFormInput>({
    defaultValues: subject,
    resolver: yupResolver(
      getSubjectGeneralDataSchema(canUseInternalCode, subject.entryStatus, language, subjectType, t),
    ),
  });

  useEffect(() => {
    if (subject.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as SubjectFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <SubjectGeneralData
        control={control}
        errors={errors}
        isLegalNatureDisabled={isLegalNatureDisabled}
        mode={FormMode.Create}
        subjectType={subjectType}
        setValue={setValue}
      />
    </StepForm>
  );
};
