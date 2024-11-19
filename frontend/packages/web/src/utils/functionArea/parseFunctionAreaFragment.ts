import { FunctionAreaFragment } from '../../gql/RealGimm.Web.FunctionArea.fragment';
import { FunctionAreaFormInput } from '../../interfaces/FormInputs/FunctionArea';

export const parseFunctionAreaToFunctionAreaFormInput = (
  functionArea: FunctionAreaFragment,
): FunctionAreaFormInput => ({
  functionAreaId: functionArea.id,
  guid: crypto.randomUUID(),
  internalCode: functionArea.internalCode,
  name: functionArea.name,
  surfaceType: functionArea.surfaceType,
});
