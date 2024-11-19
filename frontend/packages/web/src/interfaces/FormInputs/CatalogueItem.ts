import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput, FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueItemFieldValue } from '../FieldValues/CatalogueItem';
import { CatalogueTypeFormInput } from './CatalogueType';

export interface CatalogueItemFormInput {
  activationDate: Date | null;
  catalogueItemId: number | null;
  catalogueType: CatalogueTypeFormInput | null;
  decommissioningDate: Date | null;
  documents: DocumentFormInput[];
  estate: EstateFragment | null;
  fields: FormViewerFieldFormInput[][];
  guid: string;
  internalCode: string;
  lastMaintenanceDate: Date | null;
  status: EstateStatus | null;
}

export interface CatalogueItemRow extends Omit<CatalogueItemFieldValue, 'id'> {
  id: string | number;
  subRows?: CatalogueItemRow[];
}
