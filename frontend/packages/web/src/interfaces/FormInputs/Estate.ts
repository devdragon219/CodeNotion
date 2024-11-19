import {
  EstateMarketValueType,
  EstateOwnership,
  EstateStatus,
  EstateTotalMarketValueCoefficientType,
  EstateType,
  UnitCondition,
} from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { OrgUnitFieldValue } from '../FieldValues/OrgUnit';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { UsageTypeFieldValue } from '../FieldValues/UsageType';
import { AddressFormInput } from './Addresses';
import { FloorFormInput } from './Floor';
import { MainUsageTypeFormInput } from './MainUsageType';
import { StairFormInput } from './Stair';

export interface EstateCoefficientFormInput {
  coefficientId: number | null;
  coefficientType: EstateTotalMarketValueCoefficientType | null;
  value: number | null;
}

export interface EstateMarketValueFormInput {
  marketValueId: number | null;
  marketValueType: EstateMarketValueType | null;
  value: number | null;
}

export interface EstateTotalMarketValueFormInput {
  coefficients: EstateCoefficientFormInput[];
  marketValues: EstateMarketValueFormInput[];
  notes: string;
  totalSurfaceAreaSqM: number | null;
}

export interface EstateAssetValueFormInput {
  assetValueId: number | null;
  depreciation: number | null;
  ias: number | null;
  rba: number | null;
  reclamationInterventions: number | null;
  transferYear: number | null;
  year: number | null;
}

export interface EstateRefactoringFormInput {
  ageCoefficient: number | null;
  buildingPermitYear: number | null;
  condition: UnitCondition | null;
  estateUnits: EstateUnitFragment[];
  refactoringId?: number;
  referenceYear: number | null;
}

export interface EstateFormInput {
  addresses: AddressFormInput[];
  assetValues: EstateAssetValueFormInput[];
  buildYear: number | null;
  decommissioningDate: Date | null;
  documents: DocumentFormInput[];
  estateId: number | null;
  externalCode: string;
  floors: FloorFormInput[];
  images: DocumentFormInput[];
  internalCode: string;
  mainUsageType: MainUsageTypeFormInput | null;
  managementOrgUnit: OrgUnitFieldValue | null;
  managementSubject: SubjectFieldValue | null;
  name: string;
  notes: string;
  ownership: EstateOwnership | null;
  refactorings: EstateRefactoringFormInput[];
  stairs: StairFormInput[];
  status: EstateStatus | null;
  surfaceAreaSqM: number | null;
  totalMarketValue: EstateTotalMarketValueFormInput | null;
  estateType: EstateType | null;
  usageType: UsageTypeFieldValue | null;
}
