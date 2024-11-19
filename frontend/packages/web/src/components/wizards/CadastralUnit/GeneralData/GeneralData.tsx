import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCadastralUnit } from '../../../../hooks/useCadastralUnit';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitGeneralDataSchema } from '../../../../utils/cadastralUnit/schemas/generalData';
import { CadastralUnitGeneralData } from '../../../domains/CadastralUnit/GeneralData/GeneralData';
import { CadastralUnitGeneralDataStepProps } from './GeneralData.types';

export const CadastralUnitGeneralDataStep = ({
  cadastralUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: CadastralUnitGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useCadastralUnit();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: cadastralUnit,
    resolver: yupResolver(getCadastralUnitGeneralDataSchema(language, t)),
  });

  useEffect(() => {
    if (cadastralUnit.internalCode === '') {
      getInternalCode(cadastralUnit.estateUnit!.id, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CadastralUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CadastralUnitGeneralData control={control} errors={errors} mode={FormMode.Create} setValue={setValue} />
    </StepForm>
  );
};
