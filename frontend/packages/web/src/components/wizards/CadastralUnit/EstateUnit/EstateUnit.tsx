import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitEstateUnitSchema } from '../../../../utils/cadastralUnit/schemas/estateUnit';
import { CadastralUnitEstateUnit } from '../../../domains/CadastralUnit/EstateUnit/EstateUnit';
import { CadastralUnitEstateUnitStepProps } from './EstateUnit.types';
import { CadastralUnitEstateUnits } from './EstateUnits/EstateUnits';

export const CadastralUnitEstateUnitStep = ({
  cadastralUnit,
  estateUnit,
  onChange,
  onError,
  onNext,
}: CadastralUnitEstateUnitStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: cadastralUnit,
    resolver: yupResolver(getCadastralUnitEstateUnitSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CadastralUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.estateUnit) {
      onError(errors.estateUnit.message);
    }
    // eslint-disable-next-line
  }, [errors.estateUnit]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      {estateUnit ? (
        <CadastralUnitEstateUnit control={control} mode={FormMode.Create} />
      ) : (
        <CadastralUnitEstateUnits setValue={setValue} />
      )}
    </StepForm>
  );
};
