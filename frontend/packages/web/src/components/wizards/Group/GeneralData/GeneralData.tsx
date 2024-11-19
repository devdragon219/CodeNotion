import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';
import { getGroupGeneralDataSchema } from '../../../../utils/group/schemas/generalData';
import { GroupGeneralData } from '../../../domains/Group/GeneralData/GeneralData';
import { GroupGeneralDataStepProps } from './GeneralData.types';

export const GroupGeneralDataStep = ({ group, onChange, onError, onNext }: GroupGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<GroupFormInput>({
    defaultValues: group,
    resolver: yupResolver(getGroupGeneralDataSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as GroupFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <GroupGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
