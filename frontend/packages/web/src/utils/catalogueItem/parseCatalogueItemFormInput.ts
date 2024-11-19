import { CatalogueItemInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { CatalogueItemFormInput } from '../../interfaces/FormInputs/CatalogueItem';

export const parseCatalogueItemFormInputToCatalogueItemInput = (
  catalogueItem: CatalogueItemFormInput,
  catalogueTypeId: number,
  estateId: number,
): CatalogueItemInput => ({
  activationDate: parseDateToString(catalogueItem.activationDate)!,
  catalogueTypeId,
  decommissioningDate: parseDateToString(catalogueItem.decommissioningDate),
  estateId,
  fields: catalogueItem.fields.flatMap((fields) =>
    fields.map((field) => ({
      isMandatory: field.isMandatory,
      name: field.name,
      templateTypeId: field.templateTypeId,
      type: field.fieldType,
      value: field.value,
    })),
  ),
  id: catalogueItem.catalogueItemId,
  internalCode: catalogueItem.internalCode,
  lastMaintenanceDate: parseDateToString(catalogueItem.lastMaintenanceDate)!,
  status: catalogueItem.status!,
});
