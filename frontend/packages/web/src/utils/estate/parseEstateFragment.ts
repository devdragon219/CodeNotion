import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { EstateDetailFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';
import { EstateFormInput } from '../../interfaces/FormInputs/Estate';
import { getEmptyAddressFormInput } from '../components/addressesField/initialValues';
import { parseAddressToAddressFormInput } from '../components/addressesField/parseAddressFragment';
import { parseFloorToFloorFormInput } from '../components/floorField/parseFloorFragment';
import { parseMainUsageTypeToMainUsageTypeFormInput } from '../mainUsageType/parseMainUsageTypeFragment';
import { parseStairToStairFormInput } from '../stair/parseStairFragment';

export const parseEstateToEstateFormInput = (estate: EstateDetailFragment): EstateFormInput => {
  const parseAddressesIntoAddressFormInputs = (addresses: AsstAddressFragment[]): AddressFormInput[] => {
    const primary = addresses.find(({ addressType }) => addressType === AsstAddressType.Primary);
    const secondaries = estate.addresses.filter(({ addressType }) => addressType !== AsstAddressType.Primary);
    return [
      primary ? parseAddressToAddressFormInput(primary) : getEmptyAddressFormInput(AsstAddressType.Primary),
      ...secondaries.map(parseAddressToAddressFormInput),
    ];
  };

  return {
    addresses: parseAddressesIntoAddressFormInputs(estate.addresses),
    buildYear: estate.buildYear ?? null,
    decommissioningDate: parseStringToDate(estate.decommissioningDate),
    documents: [],
    externalCode: estate.externalCode ?? '',
    floors: estate.floors.map(parseFloorToFloorFormInput),
    assetValues: estate.valuations.map((valuation) => ({
      assetValueId: valuation.id,
      year: valuation.referenceYear,
      rba: valuation.rbaValue ?? null,
      ias: valuation.iasValue ?? null,
      depreciation: valuation.mortgageAmount ?? null,
      transferYear: valuation.transferYear ?? null,
      reclamationInterventions: valuation.revampOperations ?? null,
    })),
    estateId: estate.id,
    images: [],
    internalCode: estate.internalCode,
    mainUsageType: parseMainUsageTypeToMainUsageTypeFormInput(estate.mainUsageType),
    managementOrgUnit: estate.managementOrgUnit
      ? {
          id: estate.managementOrgUnit.id,
          name: estate.managementOrgUnit.name ?? '',
        }
      : null,
    managementSubject: {
      id: estate.managementSubject.id,
      name: estate.managementSubject.name,
    },
    name: estate.name ?? '',
    notes: estate.notes ?? '',
    ownership: estate.ownership,
    refactorings: estate.refactorings.map((refactoring) => ({
      refactoringId: refactoring.id,
      referenceYear: refactoring.referenceYear,
      buildingPermitYear: refactoring.buildingPermitYear ?? null,
      condition: refactoring.condition,
      ageCoefficient: refactoring.ageCoefficient ?? null,
      estateUnits: refactoring.estateUnits as EstateUnitFragment[],
    })),
    stairs: estate.stairs.map(parseStairToStairFormInput),
    status: estate.status,
    surfaceAreaSqM: estate.surfaceAreaSqM ?? null,
    totalMarketValue: estate.totalMarketValue
      ? {
          totalSurfaceAreaSqM: estate.totalMarketValue.totalSurfaceAreaSqM,
          notes: estate.totalMarketValue.notes ?? '',
          coefficients: estate.totalMarketValue.coefficients.map(({ id, type, value }) => ({
            coefficientId: id,
            coefficientType: type,
            value,
          })),
          marketValues: estate.totalMarketValue.marketValues.map(({ id, type, value }) => ({
            marketValueId: id,
            marketValueType: type,
            value,
          })),
        }
      : null,
    estateType: estate.type,
    usageType: estate.usageType,
  };
};
