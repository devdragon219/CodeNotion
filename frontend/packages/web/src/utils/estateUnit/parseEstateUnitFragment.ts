import { RegistrationDateType, RegistrationFieldType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { EstateUnitDetailFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitFormInput } from '../../interfaces/FormInputs/EstateUnit';
import { parseEstateUnitCadastralUnitToEstateUnitCadastralUnitFormInput } from '../cadastralUnit/parseCadastralUnitFragment';
import { parseAddressToAddressFormInput } from '../components/addressesField/parseAddressFragment';
import { parseFloorToFloorFormInput } from '../components/floorField/parseFloorFragment';
import { parseStairToStairFormInput } from '../stair/parseStairFragment';
import { getEmptyEstateUnitRepossessionFormInput } from './initialValues';

export const parseEstateUnitToEstateUnitFormInput = (estateUnit: EstateUnitDetailFragment): EstateUnitFormInput => {
  const getOfficialActDateOfType = (type: RegistrationDateType) =>
    parseStringToDate(
      estateUnit.officialAct?.actRegistrationDates.find(({ dateType }) => dateType === type)?.value ?? null,
    );
  const getOfficialActFieldOfType = (type: RegistrationFieldType) =>
    estateUnit.officialAct?.actRegistrationFields.find(({ fieldType }) => fieldType === type)?.value ?? '';

  return {
    address: parseAddressToAddressFormInput(estateUnit.address),
    cadastralUnit: estateUnit.currentCadastralUnit
      ? parseEstateUnitCadastralUnitToEstateUnitCadastralUnitFormInput(estateUnit.currentCadastralUnit)
      : null,
    disusedDate: parseStringToDate(estateUnit.disusedDate),
    documents: [],
    estate: estateUnit.estate,
    estateUnitType: estateUnit.type,
    externalCode: estateUnit.externalCode ?? '',
    floors: estateUnit.floors.map(parseFloorToFloorFormInput),
    estateUnitId: estateUnit.id,
    internalCode: estateUnit.internalCode,
    name: estateUnit.name ?? '',
    notes: estateUnit.notes ?? '',
    officialAct: estateUnit.officialAct
      ? {
          protocolNumber: estateUnit.officialAct.protocolNumber,
          repertoireNumber: getOfficialActFieldOfType(RegistrationFieldType.ItRepertoireNumber),
          registrationNumber: estateUnit.officialAct.registrationNumber ?? '',
          registrationDate: parseStringToDate(estateUnit.officialAct.registrationDate),
          writtenAtCity: getOfficialActFieldOfType(RegistrationFieldType.ItWrittenAtCity),
          transcriptionNumber: getOfficialActFieldOfType(RegistrationFieldType.ItTranscriptionNumber),
          transcriptionDate: getOfficialActDateOfType(RegistrationDateType.ItTranscriptionDate),
          transcriptionCity: getOfficialActFieldOfType(RegistrationFieldType.ItTranscriptionCity),
          notaryActDate: getOfficialActDateOfType(RegistrationDateType.ItNotaryActDate),
          collectionNumber: getOfficialActFieldOfType(RegistrationFieldType.ItCollectionNumber),
          notaryName: estateUnit.officialAct.issuerName ?? '',
        }
      : null,
    ownershipEndDate: parseStringToDate(estateUnit.ownershipEndDate),
    ownershipPercent: estateUnit.ownershipPercent ?? null,
    ownershipStartDate: parseStringToDate(estateUnit.ownershipStartDate),
    ownershipType: estateUnit.ownershipType,
    repossession: estateUnit.lastRepossession
      ? {
          eventDate: parseStringToDate(estateUnit.lastRepossession.eventDate),
          eventReason: estateUnit.lastRepossession.eventReason ?? null,
          eventType: estateUnit.lastRepossession.eventType ?? null,
          repossessionId: estateUnit.lastRepossession.id,
          isAssignable: estateUnit.lastRepossession.isAssignable ?? false,
          isKeysReturned: estateUnit.lastRepossession.isKeysReturned ?? false,
          isWithValuables: estateUnit.lastRepossession.isWithValuables ?? false,
          notes: estateUnit.lastRepossession.notes ?? '',
          unitStatus: estateUnit.lastRepossession.unitStatus ?? null,
        }
      : getEmptyEstateUnitRepossessionFormInput(),
    sharedArea: estateUnit.sharedArea,
    stair: estateUnit.stair ? parseStairToStairFormInput(estateUnit.stair) : null,
    status: estateUnit.status,
    subNumbering: estateUnit.subNumbering ?? '',
    surfaces: estateUnit.surfacesTree.map((surface) => ({
      floors: surface.floors.map((floor) => ({
        floor: {
          floorId: floor.floor.id ?? null,
          guid: floor.floor.templateReference ?? '',
          name: floor.floor.name ?? '',
          position: floor.floor.position,
        },
        functionAreas: floor.functionAreas.map((functionArea) => ({
          functionArea: {
            id: functionArea.functionArea.id ?? null,
            name: functionArea.functionArea.name ?? '',
            surfaceType: functionArea.functionArea.surfaceType,
          },
          surfaceId: functionArea.surfaceId ?? null,
          surfaceSqMCommonArea: functionArea.surfaceSqMCommonArea ?? null,
          surfaceSqMSideArea: functionArea.surfaceSqMSideArea ?? null,
          surfaceSqMTotal: functionArea.surfaceSqMTotal ?? null,
        })),
        surfaceId: floor.surfaceId ?? null,
        surfaceSqMCommonArea: floor.surfaceSqMCommonArea ?? null,
        surfaceSqMSideArea: floor.surfaceSqMSideArea ?? null,
        surfaceSqMTotal: floor.surfaceSqMTotal ?? null,
      })),
      metric: surface.metric,
      surfaceId: surface.surfaceId ?? null,
      surfaceSqMCommonArea: surface.surfaceSqMCommonArea ?? null,
      surfaceSqMSideArea: surface.surfaceSqMSideArea ?? null,
      surfaceSqMTotal: surface.surfaceSqMTotal ?? null,
    })),
    usageType: estateUnit.usageType,
  };
};
