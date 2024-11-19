import { AdminGroupInput } from '@realgimm5/frontend-common/gql/types';

import { GroupFormInput } from '../../interfaces/FormInputs/Group';

export const parseGroupFormInputToGroupInput = (groupInput: GroupFormInput): AdminGroupInput => ({
  name: groupInput.name,
  description: groupInput.description,
  features: groupInput.permissions,
});
