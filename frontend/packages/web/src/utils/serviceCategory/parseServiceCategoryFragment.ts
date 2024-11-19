import { ServiceCategoryFragment } from '../../gql/RealGimm.Web.ServiceCategory.fragment';
import { ServiceCategoryFormInput } from '../../interfaces/FormInputs/ServiceCategory';

export const parseServiceCategoryToServiceCategoryFormInput = (
  serviceCategory: ServiceCategoryFragment,
): ServiceCategoryFormInput => ({
  categoryId: serviceCategory.id,
  internalCode: serviceCategory.internalCode,
  name: serviceCategory.name,
  subCategories: serviceCategory.subCategories.map((subCategory) => ({
    guid: crypto.randomUUID(),
    internalCode: subCategory.internalCode,
    name: subCategory.name,
    subCategoryId: subCategory.id,
  })),
});
