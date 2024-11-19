import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { CadastralUnitCoordinates } from '../../CadastralUnit/Coordinates/Coordinates';
import { EstateUnitActionCadastralCoordinatesProps } from './CadastralCoordinates.types';

export const EstateUnitActionCadastralCoordinates = ({
  control,
  errors,
  iconPositionAbsolute,
}: EstateUnitActionCadastralCoordinatesProps) => (
  <CadastralUnitCoordinates
    control={control as unknown as Control<CadastralUnitFormInput>}
    errors={errors}
    iconPositionAbsolute={iconPositionAbsolute}
    mode={FormMode.Create}
    useNotes={false}
  />
);
