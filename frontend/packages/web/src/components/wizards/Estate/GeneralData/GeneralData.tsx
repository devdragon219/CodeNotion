import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEstate } from '../../../../hooks/useEstate';
import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEstateGeneralDataSchema } from '../../../../utils/estate/schemas/generalData';
import { EstateGeneralData } from '../../../domains/Estate/GeneralData/GeneralData';
import { EstateGeneralDataStepProps } from './GeneralData.types';

export const EstateGeneralDataStep = ({
  canUseInternalCode,
  estate,
  onAddFloor,
  onChange,
  onError,
  onNext,
}: EstateGeneralDataStepProps) => {
  const { t } = useTranslation();
  const { getInternalCode } = useEstate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateFormInput>({
    defaultValues: estate,
    resolver: yupResolver(getEstateGeneralDataSchema(canUseInternalCode, t)),
  });

  useEffect(() => {
    if (estate.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateGeneralData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        onAddFloor={onAddFloor}
        setValue={setValue}
      />
    </StepForm>
  );
};
