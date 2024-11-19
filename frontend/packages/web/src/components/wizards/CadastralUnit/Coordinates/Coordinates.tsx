import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getCadastralUnitCoordinatesSchema } from '../../../../utils/cadastralUnit/schemas/coordinates';
import { CadastralUnitCoordinates } from '../../../domains/CadastralUnit/Coordinates/Coordinates';
import { CadastralUnitCoordinatesStepProps } from './Coordinates.types';

export const CadastralUnitCoordinatesStep = ({
  cadastralUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: CadastralUnitCoordinatesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: cadastralUnit,
    resolver: yupResolver(getCadastralUnitCoordinatesSchema(getCoordinateType(cadastralUnit.address), t)),
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

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CadastralUnitCoordinates control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
