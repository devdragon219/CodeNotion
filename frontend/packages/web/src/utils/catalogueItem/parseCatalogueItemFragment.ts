import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { CatalogueItemDetailFragment } from '../../gql/RealGimm.Web.CatalogueItem.fragment';
import { CatalogueItemFormInput } from '../../interfaces/FormInputs/CatalogueItem';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../catalogueType/parseCatalogueTypeFragment';

export const parseCatalogueItemToCatalogueItemFormInput = (
  catalogueItem: CatalogueItemDetailFragment,
): CatalogueItemFormInput => ({
  activationDate: parseStringToDate(catalogueItem.activationDate),
  catalogueItemId: catalogueItem.id,
  catalogueType: parseCatalogueTypeToCatalogueTypeFormInput(catalogueItem.catalogueType),
  decommissioningDate: parseStringToDate(catalogueItem.decommissioningDate),
  documents: [],
  estate: catalogueItem.estate,
  fields:
    catalogueItem.catalogueType.fields?.map((fields) =>
      fields.map((field) => ({
        fieldType: field.type,
        isMandatory: field.isMandatory,
        name: field.name,
        templateTypeId: field.id,
        validValues: field.validValues ?? [],
        value: catalogueItem.fields.find(({ templateTypeId }) => templateTypeId === field.id)?.value ?? '',
      })),
    ) ?? [],
  guid: crypto.randomUUID(),
  internalCode: catalogueItem.internalCode,
  lastMaintenanceDate: parseStringToDate(catalogueItem.lastMaintenanceDate),
  status: catalogueItem.status,
});
