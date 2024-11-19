import { FunctionAreaInput } from '@realgimm5/frontend-common/gql/types';

import { FunctionAreaFormInput } from '../../interfaces/FormInputs/FunctionArea';

export const parseFunctionAreaFormInputToFunctionAreaInput = (
  functionArea: FunctionAreaFormInput,
): FunctionAreaInput => ({
  internalCode: functionArea.internalCode,
  name: functionArea.name,
  surfaceType: functionArea.surfaceType!,
});
