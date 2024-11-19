import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getCadastralUnitCoordinatesSchema } from '../../../../utils/cadastralUnit/schemas/coordinates';
import { EstateUnitActionCadastralCoordinates } from '../../../domains/EstateUnitAction/CadastralCoordinates/CadastralCoordinates';
import { EstateUnitSplitCadastralCoordinatesStepProps } from './CadastralCoordinates.types';

export const EstateUnitSplitCadastralCoordinatesStep = ({
  estateUnit,
  onBack,
  onChange,
  onError,
  onSave,
}: EstateUnitSplitCadastralCoordinatesStepProps) => {
  const { t } = useTranslation();
  const { initialState } = useTable();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitCadastralUnitFormInput>({
    defaultValues: estateUnit.cadastralUnit!,
    resolver: yupResolver(getCadastralUnitCoordinatesSchema(getCoordinateType(estateUnit.cadastralUnit?.address), t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnit,
        cadastralUnit: formValues as EstateUnitCadastralUnitFormInput,
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleSave = useCallback(
    (cadastralUnit: EstateUnitCadastralUnitFormInput) => {
      onSave(
        {
          ...estateUnit,
          cadastralUnit,
        },
        initialState,
      );
    },
    [estateUnit, initialState, onSave],
  );

  return (
    <StepForm
      completeLabel="estate_unit.dialog.split.save"
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(handleSave)}
    >
      <EstateUnitActionCadastralCoordinates control={control} errors={errors} />
    </StepForm>
  );
};
