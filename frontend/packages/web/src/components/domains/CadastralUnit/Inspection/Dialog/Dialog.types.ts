import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';

import { CadastralInspectionFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface InspectionDialogProps {
  estateUnitType: EstateUnitType | null;
  onClose: () => void;
  onSave: (value: CadastralInspectionFormInput) => void;
}
