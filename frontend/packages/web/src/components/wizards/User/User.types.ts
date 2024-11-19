import { UserType } from '@realgimm5/frontend-common/gql/types';

import { UserFormInput } from '../../../interfaces/FormInputs/User';

export interface UserCreateDialogProps {
  userType: UserType;
  onClose: () => void;
  onSave: (subject: UserFormInput) => void;
}
