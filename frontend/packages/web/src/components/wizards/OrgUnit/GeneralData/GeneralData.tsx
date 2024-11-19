import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useOrgUnit } from '../../../../hooks/useOrgUnit';
import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { getOrgUnitGeneralDataSchema } from '../../../../utils/orgUnit/schemas/generalData';
import { OrgUnitGeneralData } from '../../../domains/OrgUnit/GeneralData/GeneralData';
import { OrgUnitGeneralDataStepProps } from './GeneralData.types';

export const OrgUnitGeneralDataStep = ({
  canUseInternalCode,
  orgUnit,
  onChange,
  onError,
  onNext,
}: OrgUnitGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useOrgUnit();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<OrgUnitFormInput>({
    defaultValues: orgUnit,
    resolver: yupResolver(getOrgUnitGeneralDataSchema(canUseInternalCode, orgUnit.entryStatus, language, t)),
  });

  useEffect(() => {
    if (orgUnit.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as OrgUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <OrgUnitGeneralData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        setValue={setValue}
        trigger={trigger}
      />
    </StepForm>
  );
};
