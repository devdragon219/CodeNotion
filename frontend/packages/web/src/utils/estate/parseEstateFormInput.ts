import { EstateInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { EstateFormInput } from '../../interfaces/FormInputs/Estate';
import { parseAddressFormInputToAsstAddressInput } from '../components/addressesField/parseAddressFormInput';
import { getAddressesOrEmpty } from '../input/getAddressesOrEmpty';

export const parseEstateFormInputToEstateInput = (estate: EstateFormInput): EstateInput => ({
  addresses: getAddressesOrEmpty(estate.addresses).map((address) => parseAddressFormInputToAsstAddressInput(address)),
  buildYear: estate.buildYear,
  decommissioningDate: parseDateToString(estate.decommissioningDate),
  externalCode: getStringOrNull(estate.externalCode),
  floors: estate.floors.map((floor) => ({
    name: floor.name,
    position: floor.position,
    id: floor.floorId,
    templateReference: floor.guid,
  })),
  internalCode: estate.internalCode,
  mainUsageTypeId: estate.mainUsageType!.mainUsageTypeId!,
  managementOrgUnitId: estate.managementOrgUnit?.id,
  managementSubjectId: estate.managementSubject!.id,
  marketValue: estate.totalMarketValue
    ? {
        coefficients: estate.totalMarketValue.coefficients.map(({ coefficientId, coefficientType, value }) => ({
          id: coefficientId,
          type: coefficientType!,
          value: value!,
        })),
        marketValues: estate.totalMarketValue.marketValues.map(({ marketValueId, marketValueType, value }) => ({
          id: marketValueId,
          type: marketValueType!,
          value: value!,
        })),
        notes: getStringOrNull(estate.totalMarketValue.notes),
        totalSurfaceAreaSqM: estate.totalMarketValue.totalSurfaceAreaSqM!,
      }
    : null,
  name: getStringOrNull(estate.name),
  notes: getStringOrNull(estate.notes),
  ownership: estate.ownership!,
  refactorings: estate.refactorings.map((refactoring) => ({
    ageCoefficient: refactoring.ageCoefficient,
    buildingPermitYear: refactoring.buildingPermitYear,
    condition: refactoring.condition!,
    estateUnitIds: refactoring.estateUnits.map(({ id }) => id),
    id: refactoring.refactoringId,
    referenceYear: refactoring.referenceYear!,
  })),
  stairs: estate.stairs
    .filter(({ description }) => !!getStringOrNull(description))
    .map((stair) => ({
      description: stair.description,
      id: stair.stairId,
    })),
  status: estate.status!,
  surfaceAreaSqM: estate.surfaceAreaSqM,
  type: estate.estateType!,
  usageTypeId: estate.usageType!.id,
  valuations: estate.assetValues.map((assetValue) => ({
    id: assetValue.assetValueId,
    ias: assetValue.ias,
    mortgageAmount: assetValue.depreciation,
    rba: assetValue.rba,
    revampOperations: assetValue.reclamationInterventions,
    transferYear: assetValue.transferYear,
    year: assetValue.year!,
  })),
});
