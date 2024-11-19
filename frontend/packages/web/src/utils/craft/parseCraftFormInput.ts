import { CraftInput } from '@realgimm5/frontend-common/gql/types';

import { CraftFormInput } from '../../interfaces/FormInputs/Craft';

export const parseCraftFormInputToCraftInput = (craft: CraftFormInput): CraftInput => ({
  internalCode: craft.internalCode,
  name: craft.name,
  ordering: craft.ordering,
});
