import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';

import { OrgUnitFormInput } from '../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitCreateDialogProps {
  orgUnitType: OrgUnitType;
  onClose: () => void;
  onSave: (orgUnit: OrgUnitFormInput) => void;
}
