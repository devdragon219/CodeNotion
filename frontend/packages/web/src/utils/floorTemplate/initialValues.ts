import { FloorTemplateFormInput } from '../../interfaces/FormInputs/Floor';

export const getEmptyFloorTemplateFormInput = (): FloorTemplateFormInput => ({
  floorTemplateId: null,
  name: '',
  position: null,
});
