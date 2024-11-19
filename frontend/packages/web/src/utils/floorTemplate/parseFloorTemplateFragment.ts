import { FloorTemplateFragment } from '../../gql/RealGimm.Web.FloorTemplate.fragment';
import { FloorTemplateFormInput } from '../../interfaces/FormInputs/Floor';

export const parseFloorTemplateToFloorTemplateFormInput = (
  floorTemplate: FloorTemplateFragment,
): FloorTemplateFormInput => ({
  floorTemplateId: floorTemplate.id,
  position: floorTemplate.position,
  name: floorTemplate.name,
});
