import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getCadastralUnitCoordinatesSchema } from '../../../../utils/cadastralUnit/schemas/coordinates';
import { EstateUnitActionCadastralCoordinates } from '../../EstateUnitAction/CadastralCoordinates/CadastralCoordinates';
import { EstateUnitTransformCadastralCoordinatesStepProps } from './CadastralCoordinates.types';

export const EstateUnitTransformCadastralCoordinatesStep = ({
  estateUnitTransform,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitTransformCadastralCoordinatesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnitTransform.toEstateUnit.cadastralUnit!,
    resolver: yupResolver(
      getCadastralUnitCoordinatesSchema(getCoordinateType(estateUnitTransform.toEstateUnit.cadastralUnit!.address), t),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitTransform,
        toEstateUnit: {
          ...estateUnitTransform.toEstateUnit,
          cadastralUnit: formValues as EstateUnitCadastralUnitFormInput,
        },
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <EstateUnitActionCadastralCoordinates control={control} errors={errors} iconPositionAbsolute={false} />
    </StepForm>
  );
};
