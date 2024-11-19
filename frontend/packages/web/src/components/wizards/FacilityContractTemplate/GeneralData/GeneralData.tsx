import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFacilityContractTemplate } from '../../../../hooks/useFacilityContractTemplate';
import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';
import { getFacilityContractTemplateGeneralDataSchema } from '../../../../utils/facilityContractTemplate/schemas/generalData';
import { FacilityContractTemplateGeneralData } from '../../../domains/FacilityContractTemplate/GeneralData/GeneralData';
import { FacilityContractTemplateGeneralDataStepProps } from './GeneralData.types';

export const FacilityContractTemplateGeneralDataStep = ({
  canUseInternalCode,
  facilityContractTemplate,
  onChange,
  onError,
  onNext,
}: FacilityContractTemplateGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useFacilityContractTemplate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: facilityContractTemplate,
    resolver: yupResolver(getFacilityContractTemplateGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (facilityContractTemplate.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as FacilityContractTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <FacilityContractTemplateGeneralData control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
