import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';
import { getAdministrationTermGeneralDataSchema } from '../../../../utils/administrationTerm/schemas/generalData';
import { AdministrationTermGeneralData } from '../../../domains/AdministrationTerm/GeneralData/GeneralData';
import { AdministrationTermGeneralDataStepProps } from './GeneralData.types';

export const AdministrationTermGeneralDataStep = ({
  administration,
  administrationTerm,
  existingAdministrationTerms,
  onChange,
  onError,
  onNext,
}: AdministrationTermGeneralDataStepProps) => {
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
  } = useForm<AdministrationTermFormInput>({
    defaultValues: administrationTerm,
    resolver: yupResolver(
      getAdministrationTermGeneralDataSchema(existingAdministrationTerms, language, t, administration),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as AdministrationTermFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <AdministrationTermGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
