import { EstateUnitStatus, SurfaceMeasurementMetric } from '@realgimm5/frontend-common/gql/types';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import {
  EstateUnitFloorSurfaceFormInput,
  EstateUnitFormInput,
  EstateUnitFunctionAreaSurfaceFormInput,
  EstateUnitOfficialActFormInput,
  EstateUnitRepossessionFormInput,
  EstateUnitSurfaceFormInput,
} from '../../interfaces/FormInputs/EstateUnit';
import { getEmptyCadastralUnitFormInput } from '../cadastralUnit/initialValues';

export const getEmptyEstateUnitOfficialActFormInput = (): EstateUnitOfficialActFormInput => ({
  protocolNumber: '',
  repertoireNumber: '',
  registrationNumber: '',
  registrationDate: null,
  writtenAtCity: '',
  transcriptionNumber: '',
  transcriptionDate: null,
  transcriptionCity: '',
  notaryActDate: null,
  collectionNumber: '',
  notaryName: '',
});

export const getEmptyEstateUnitRepossessionFormInput = (): EstateUnitRepossessionFormInput => ({
  eventDate: null,
  eventReason: null,
  eventType: null,
  isAssignable: false,
  isKeysReturned: false,
  isWithValuables: false,
  notes: '',
  repossessionId: null,
  unitStatus: null,
});

export const getEmptyEstateUnitFloorSurfaceFormInput = (
  functionAreas: EstateUnitFunctionAreaSurfaceFormInput['functionArea'][] = [],
): EstateUnitFloorSurfaceFormInput => ({
  floor: null,
  functionAreas: functionAreas.map((functionArea) => ({
    functionArea,
    surfaceId: null,
    surfaceSqMCommonArea: null,
    surfaceSqMSideArea: null,
    surfaceSqMTotal: null,
  })),
  surfaceId: null,
  surfaceSqMCommonArea: null,
  surfaceSqMSideArea: null,
  surfaceSqMTotal: null,
});

export const getEmptyEstateUnitSurfaceFormInput = (metric: SurfaceMeasurementMetric): EstateUnitSurfaceFormInput => ({
  floors: [],
  metric,
  surfaceId: null,
  surfaceSqMCommonArea: null,
  surfaceSqMSideArea: null,
  surfaceSqMTotal: null,
});

export const getEmptyEstateUnitFormInput = (estate?: EstateFragment): EstateUnitFormInput => ({
  address: null,
  cadastralUnit: getEmptyCadastralUnitFormInput(),
  disusedDate: null,
  documents: [],
  estate: estate ?? null,
  estateUnitId: null,
  estateUnitType: null,
  externalCode: '',
  floors: [],
  internalCode: '',
  name: '',
  notes: '',
  officialAct: null,
  ownershipEndDate: null,
  ownershipPercent: null,
  ownershipStartDate: null,
  ownershipType: null,
  repossession: getEmptyEstateUnitRepossessionFormInput(),
  sharedArea: false,
  stair: null,
  status: EstateUnitStatus.Existing,
  subNumbering: '',
  surfaces: [],
  usageType: null,
});
