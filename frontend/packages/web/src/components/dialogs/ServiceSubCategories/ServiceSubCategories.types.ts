import { ServiceCategoryFragment } from '../../../gql/RealGimm.Web.ServiceCategory.fragment';

export interface ServiceSubCategorieDialogProps {
  subCategories: ServiceCategoryFragment['subCategories'];
  onClose: () => void;
}
