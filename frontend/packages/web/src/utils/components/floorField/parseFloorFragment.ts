import { FloorFragment } from '../../../gql/RealGimm.Web.Floor.fragment';
import { FloorFormInput } from '../../../interfaces/FormInputs/Floor';

export const parseFloorToFloorFormInput = (floor: FloorFragment): FloorFormInput => ({
  guid: floor.templateReference,
  floorId: floor.id,
  name: floor.name,
  position: floor.position,
});
