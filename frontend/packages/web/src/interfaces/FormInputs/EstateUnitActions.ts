import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitFormInput } from './EstateUnit';

export interface EstateUnitMergeFormInput {
  fromEstateUnits: EstateUnitFragment[];
  toEstateUnit: EstateUnitFormInput;
}

export interface EstateUnitSplitFormInput {
  fromEstateUnit: EstateUnitFragment | null;
  toEstateUnits: EstateUnitFormInput[];
}

export interface EstateUnitTransformFormInput {
  fromEstateUnit: EstateUnitFragment | null;
  toEstateUnit: EstateUnitFormInput;
}
