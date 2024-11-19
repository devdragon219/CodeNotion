import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getCadastralUnitCoordinatesSchema } from '../../../../utils/cadastralUnit/schemas/coordinates';
import { EstateUnitActionCadastralCoordinates } from '../../EstateUnitAction/CadastralCoordinates/CadastralCoordinates';
import { EstateUnitMergeCadastralCoordinatesStepProps } from './CadastralCoordinates.types';

export const EstateUnitMergeCadastralCoordinatesStep = ({
  estateUnitMerge,
  onBack,
  onChange,
  onError,
  onNext,
}: EstateUnitMergeCadastralCoordinatesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnitMerge.toEstateUnit.cadastralUnit!,
    resolver: yupResolver(
      getCadastralUnitCoordinatesSchema(getCoordinateType(estateUnitMerge.toEstateUnit.cadastralUnit!.address), t),
    ),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitMerge,
        toEstateUnit: {
          ...estateUnitMerge.toEstateUnit,
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
