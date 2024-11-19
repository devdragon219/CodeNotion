import { EstateUnitInput, EstateUnitRepossessionInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { EstateUnitFormInput, EstateUnitRepossessionFormInput } from '../../interfaces/FormInputs/EstateUnit';
import { parseEstateUnitCadastralUnitFormInputToEstateUnitCadastralUnitInput } from '../cadastralUnit/parseCadastralUnitFormInput';

export const parseEstateUnitFormInputToEstateUnitInput = (
  estateUnit: EstateUnitFormInput,
  useCadastralUnit = false,
): EstateUnitInput => {
  const getRepossessionOrNull = (repossession: EstateUnitRepossessionFormInput): EstateUnitRepossessionInput | null => {
    if (
      [repossession.eventDate, repossession.eventReason, repossession.eventType, repossession.unitStatus].some(
        (it) => !!it,
      ) ||
      !!getStringOrNull(repossession.notes)
    ) {
      return {
        eventDate: parseDateToString(repossession.eventDate),
        eventId: repossession.repossessionId,
        eventReason: repossession.eventReason,
        eventType: repossession.eventType,
        isAssignable: repossession.isAssignable,
        isKeysReturned: repossession.isKeysReturned,
        isWithValuables: repossession.isWithValuables,
        notes: getStringOrNull(repossession.notes),
        unitStatus: repossession.unitStatus,
      };
    }
    return null;
  };

  return {
    addressId: estateUnit.address!.addressId!,
    cadastralUnit:
      useCadastralUnit && !!estateUnit.cadastralUnit
        ? parseEstateUnitCadastralUnitFormInputToEstateUnitCadastralUnitInput(
            estateUnit.cadastralUnit,
            estateUnit.estateUnitType,
          )
        : undefined,
    disusedDate: parseDateToString(estateUnit.disusedDate),
    estateId: estateUnit.estate!.id,
    externalCode: getStringOrNull(estateUnit.externalCode),
    floorIds: estateUnit.floors.map(({ floorId }) => floorId!),
    internalCode: estateUnit.internalCode,
    name: getStringOrNull(estateUnit.name),
    notes: getStringOrNull(estateUnit.notes),
    officialAct: estateUnit.officialAct
      ? {
          collectionNumber: getStringOrNull(estateUnit.officialAct.collectionNumber),
          notaryActDate: parseDateToString(estateUnit.officialAct.notaryActDate)!,
          notaryName: getStringOrNull(estateUnit.officialAct.notaryName),
          protocolNumber: estateUnit.officialAct.protocolNumber,
          registrationDate: parseDateToString(estateUnit.officialAct.registrationDate),
          registrationNumber: getStringOrNull(estateUnit.officialAct.registrationNumber),
          repertoireNumber: getStringOrNull(estateUnit.officialAct.repertoireNumber),
          transcriptionCity: getStringOrNull(estateUnit.officialAct.transcriptionCity),
          transcriptionDate: parseDateToString(estateUnit.officialAct.transcriptionDate),
          transcriptionNumber: getStringOrNull(estateUnit.officialAct.transcriptionNumber),
          writtenAtCity: getStringOrNull(estateUnit.officialAct.writtenAtCity),
        }
      : null,
    ownershipEndDate: parseDateToString(estateUnit.ownershipEndDate),
    ownershipPercent: estateUnit.ownershipPercent,
    ownershipStartDate: parseDateToString(estateUnit.ownershipStartDate)!,
    ownershipType: estateUnit.ownershipType!,
    repossession: getRepossessionOrNull(estateUnit.repossession),
    sharedArea: estateUnit.sharedArea,
    stairId: estateUnit.stair?.stairId,
    status: estateUnit.status!,
    subNumbering: getStringOrNull(estateUnit.subNumbering),
    surfaces: estateUnit.surfaces.map((surface) => ({
      floors: surface.floors.map((floor) => ({
        floor: {
          id: floor.floor!.floorId,
          name: floor.floor!.name,
          position: floor.floor!.position,
          templateReference: floor.floor!.guid,
        },
        functionAreas: floor.functionAreas.map((functionArea) => ({
          functionArea: {
            id: functionArea.functionArea.id,
            name: functionArea.functionArea.name,
            surfaceType: functionArea.functionArea.surfaceType,
          },
          surfaceId: functionArea.surfaceId,
          surfaceSqMCommonArea: functionArea.surfaceSqMCommonArea,
          surfaceSqMSideArea: functionArea.surfaceSqMSideArea,
          surfaceSqMTotal: functionArea.surfaceSqMTotal,
        })),
        surfaceId: floor.surfaceId,
        surfaceSqMCommonArea: floor.surfaceSqMCommonArea,
        surfaceSqMSideArea: floor.surfaceSqMSideArea,
        surfaceSqMTotal: floor.surfaceSqMTotal,
      })),
      metric: surface.metric,
      surfaceId: surface.surfaceId,
      surfaceSqMCommonArea: surface.surfaceSqMCommonArea,
      surfaceSqMSideArea: surface.surfaceSqMSideArea,
      surfaceSqMTotal: surface.surfaceSqMTotal,
    })),
    type: estateUnit.estateUnitType!,
    usageTypeId: estateUnit.usageType!.id,
  };
};
