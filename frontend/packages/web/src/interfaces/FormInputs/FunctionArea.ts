import { SurfaceType } from '@realgimm5/frontend-common/gql/types';

export interface FunctionAreaFormInput {
  functionAreaId: number | null;
  guid: string;
  internalCode: string;
  name: string;
  surfaceType: SurfaceType | null;
}

export interface FunctionAreasFieldValues {
  functionAreas: FunctionAreaFormInput[];
}
