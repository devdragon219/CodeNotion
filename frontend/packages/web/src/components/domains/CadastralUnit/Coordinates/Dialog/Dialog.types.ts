import { CoordinateType } from '@realgimm5/frontend-common/gql/types';

import { CadastralCoordinateFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface CoordinatesDialogInput {
  coordinates: CadastralCoordinateFormInput;
  index: number;
}

export interface CoordinatesDialogProps {
  coordinateType: CoordinateType;
  input?: CoordinatesDialogInput;
  onClose: () => void;
  onSave: (value: CadastralCoordinateFormInput[] | CoordinatesDialogInput) => void;
}
