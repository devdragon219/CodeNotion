import { CraftFragment } from '../../gql/RealGimm.Web.Craft.fragment';
import { CraftFormInput } from '../../interfaces/FormInputs/Craft';

export const parseCraftToCraftFormInput = (craft: CraftFragment): CraftFormInput => ({
  craftId: craft.id,
  internalCode: craft.internalCode,
  name: craft.name,
  ordering: craft.ordering,
});
