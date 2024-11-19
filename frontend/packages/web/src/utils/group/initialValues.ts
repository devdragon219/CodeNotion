import { GroupFormInput } from '../../interfaces/FormInputs/Group';

export const getEmptyGroupFormInput = (): GroupFormInput => ({
  groupId: null,
  name: '',
  description: '',
  permissions: [],
});
