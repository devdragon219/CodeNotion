import { StairFragment } from '../../gql/RealGimm.Web.Stair.fragment';
import { StairFormInput } from '../../interfaces/FormInputs/Stair';

export const parseStairToStairFormInput = (stair: StairFragment): StairFormInput => ({
  description: stair.description,
  stairId: stair.id,
});
