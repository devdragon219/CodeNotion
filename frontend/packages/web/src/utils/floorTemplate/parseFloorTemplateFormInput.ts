import { FloorTemplateInput } from '@realgimm5/frontend-common/gql/types';

import { FloorTemplateFormInput } from '../../interfaces/FormInputs/Floor';

export const parseFloorTemplateFormInputToFloorTemplateInput = (
  floorTemplate: FloorTemplateFormInput,
): FloorTemplateInput => ({
  position: floorTemplate.position!,
  name: floorTemplate.name,
});
