import { CraftFormInput } from '../../interfaces/FormInputs/Craft';

export const getEmptyCraftFormInput = (): CraftFormInput => ({
  craftId: null,
  internalCode: '',
  name: '',
  ordering: 0,
});
