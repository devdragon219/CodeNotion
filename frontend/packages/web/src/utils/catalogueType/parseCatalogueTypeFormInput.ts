import { CatalogueTypeInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseFormBuilderRowFormInputsToFieldInputs } from '@realgimm5/frontend-common/utils';

import { CatalogueTypeFormInput } from '../../interfaces/FormInputs/CatalogueType';

export const parseCatalogueTypeFormInputToCatalogueTypeInput = (
  catalogueType: CatalogueTypeFormInput,
): CatalogueTypeInput => ({
  activities: catalogueType.activities.map((activity) => ({
    activityType: activity.activityType!,
    id: activity.activityId,
    isMandatoryByLaw: activity.isMandatoryByLaw,
    name: activity.name,
  })),
  categoryId: catalogueType.category!.categoryId!,
  fields: parseFormBuilderRowFormInputsToFieldInputs(catalogueType.fields),
  internalCode: catalogueType.internalCode,
  name: catalogueType.name,
  notes: getStringOrNull(catalogueType.notes),
  subCategoryId: catalogueType.subCategory?.subCategoryId,
  usageTypeIds: catalogueType.usageTypes.map((usageType) => usageType.id),
});
