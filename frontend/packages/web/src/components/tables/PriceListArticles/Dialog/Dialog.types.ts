import { PriceListArticleFragment } from '../../../../gql/RealGimm.Web.PriceListArticle.fragment';

export interface CatalogueTypesDialogProps {
  catalogueTypes: PriceListArticleFragment['catalogueTypes'];
  onClose: () => void;
}
