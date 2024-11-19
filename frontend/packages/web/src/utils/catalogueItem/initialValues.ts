import { EstateStatus } from '@realgimm5/frontend-common/gql/types';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueItemFormInput } from '../../interfaces/FormInputs/CatalogueItem';
import { CatalogueTypeFormInput } from '../../interfaces/FormInputs/CatalogueType';

export const getEmptyCatalogueItemFormInput = (
  catalogueType: CatalogueTypeFormInput,
  estate: EstateFragment | null = null,
  status: EstateStatus | null = null,
): CatalogueItemFormInput => ({
  activationDate: null,
  catalogueItemId: null,
  catalogueType,
  decommissioningDate: null,
  documents: [],
  estate,
  fields: catalogueType.fields.map(({ fields }) =>
    fields.map((field) => ({
      fieldType: field.fieldType,
      isMandatory: field.isMandatory,
      name: field.name,
      templateTypeId: field.fieldId ?? '',
      validValues: field.validValues,
      value: '',
    })),
  ),
  guid: crypto.randomUUID(),
  internalCode: '',
  lastMaintenanceDate: null,
  status,
});
