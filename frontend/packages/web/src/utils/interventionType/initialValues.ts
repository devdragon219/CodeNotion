import { InterventionTypeFormInput } from '../../interfaces/FormInputs/InterventionType';

export const getEmptyInterventionTypeFormInput = (): InterventionTypeFormInput => ({
  internalCode: '',
  interventionTypeId: null,
  name: '',
});
