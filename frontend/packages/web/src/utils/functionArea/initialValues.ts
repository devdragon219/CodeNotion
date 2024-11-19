import { FunctionAreaFormInput } from '../../interfaces/FormInputs/FunctionArea';

export const getEmptyFunctionAreaFormInput = (): FunctionAreaFormInput => ({
  functionAreaId: null,
  guid: crypto.randomUUID(),
  internalCode: '',
  name: '',
  surfaceType: null,
});
