import {
  EstateUnitOwnershipType,
  EstateUnitStatus,
  EstateUnitType,
  RepossessionReason,
  RepossessionType,
  SurfaceMeasurementMetric,
  SurfaceType,
  UnitCondition,
} from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { UsageTypeFieldValue } from '../FieldValues/UsageType';
import { AddressFormInput } from './Addresses';
import { CadastralUnitFormInput } from './CadastralUnit';
import { FloorFormInput } from './Floor';
import { StairFormInput } from './Stair';

export interface EstateUnitOfficialActFormInput {
  protocolNumber: string;
  repertoireNumber: string;
  registrationNumber: string;
  registrationDate: Date | null;
  writtenAtCity: string;
  transcriptionNumber: string;
  transcriptionDate: Date | null;
  transcriptionCity: string;
  notaryActDate: Date | null;
  collectionNumber: string;
  notaryName: string;
}

export interface EstateUnitRepossessionFormInput {
  eventDate: Date | null;
  eventReason: RepossessionReason | null;
  eventType: RepossessionType | null;
  isAssignable: boolean;
  isKeysReturned: boolean;
  isWithValuables: boolean;
  notes: string;
  repossessionId: number | null;
  unitStatus: UnitCondition | null;
}

interface EstateUnitSurface {
  surfaceId: number | null;
  surfaceSqMCommonArea: number | null;
  surfaceSqMSideArea: number | null;
  surfaceSqMTotal: number | null;
}

export interface EstateUnitFunctionAreaSurfaceFormInput extends EstateUnitSurface {
  functionArea: {
    id: number | null;
    name: string;
    surfaceType: SurfaceType;
  };
}

export interface EstateUnitFloorSurfaceFormInput extends EstateUnitSurface {
  floor: FloorFormInput | null;
  functionAreas: EstateUnitFunctionAreaSurfaceFormInput[];
}

export interface EstateUnitSurfaceFormInput extends EstateUnitSurface {
  metric: SurfaceMeasurementMetric;
  floors: EstateUnitFloorSurfaceFormInput[];
}

export type EstateUnitCadastralUnitFormInput = Omit<
  CadastralUnitFormInput,
  'estateUnit' | 'history' | 'taxCalculators' | 'taxPayments'
>;

export interface EstateUnitFormInput {
  address: AddressFormInput | null;
  cadastralUnit?: EstateUnitCadastralUnitFormInput | null;
  disusedDate: Date | null;
  documents: DocumentFormInput[];
  estate: EstateFragment | null;
  estateUnitId: number | null;
  estateUnitType: EstateUnitType | null;
  externalCode: string;
  floors: FloorFormInput[];
  internalCode: string;
  name: string;
  notes: string;
  officialAct: EstateUnitOfficialActFormInput | null;
  ownershipEndDate: Date | null;
  ownershipPercent: number | null;
  ownershipStartDate: Date | null;
  ownershipType: EstateUnitOwnershipType | null;
  repossession: EstateUnitRepossessionFormInput;
  sharedArea: boolean;
  stair: StairFormInput | null;
  status: EstateUnitStatus | null;
  subNumbering: string;
  surfaces: EstateUnitSurfaceFormInput[];
  usageType: UsageTypeFieldValue | null;
}
