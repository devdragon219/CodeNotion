import { EstateUnitGroupFragment } from '../../gql/RealGimm.Web.EstateUnitGroup.fragment';
import { EstateUnitGroupFormInput } from '../../interfaces/FormInputs/EstateUnitGroup';

export const parseEstateUnitGroupToEstateUnitGroupFormInput = (
  estateUnitGroup: EstateUnitGroupFragment,
): EstateUnitGroupFormInput => ({
  estateUnitGroupId: estateUnitGroup.id,
  estateUnits: estateUnitGroup.estateUnits,
  internalCode: estateUnitGroup.internalCode,
  managementSubject: estateUnitGroup.managementSubject,
  name: estateUnitGroup.name,
});
