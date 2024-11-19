import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEstateUnitGroup } from '../../../../hooks/useEstateUnitGroup';
import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';
import { getEstateUnitGroupGeneralDataSchema } from '../../../../utils/estateUnitGroup/schemas/generalData';
import { EstateUnitGroupGeneralData } from '../../../domains/EstateUnitGroup/GeneralData/GeneralData';
import { EstateUnitGroupGeneralDataStepProps } from './GeneralData.types';

export const EstateUnitGroupGeneralDataStep = ({
  canUseInternalCode,
  estateUnitGroup,
  onChange,
  onError,
  onNext,
}: EstateUnitGroupGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useEstateUnitGroup();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitGroupFormInput>({
    defaultValues: estateUnitGroup,
    resolver: yupResolver(getEstateUnitGroupGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (estateUnitGroup.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitGroupFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitGroupGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
