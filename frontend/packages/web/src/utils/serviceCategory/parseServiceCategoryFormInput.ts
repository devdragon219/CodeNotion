import { ServiceCategoryInput } from '@realgimm5/frontend-common/gql/types';

import { ServiceCategoryFormInput } from '../../interfaces/FormInputs/ServiceCategory';

export const parseServiceCategoryFormInputToServiceCategoryInput = (
  serviceCategory: ServiceCategoryFormInput,
): ServiceCategoryInput => ({
  id: serviceCategory.categoryId,
  internalCode: serviceCategory.internalCode,
  name: serviceCategory.name,
  subCategories: serviceCategory.subCategories.map((subCategory) => ({
    id: subCategory.subCategoryId,
    internalCode: subCategory.internalCode,
    name: subCategory.name,
  })),
});
