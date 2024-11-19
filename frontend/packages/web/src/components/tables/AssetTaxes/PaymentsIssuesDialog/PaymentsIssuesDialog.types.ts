import { AssetTaxFragment } from '../../../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';

export interface AssetTaxPaymentsIssuesDialogProps {
  assetTax: AssetTaxFragment;
  onClose: () => void;
  onSave?: (assetTax: AssetTaxFragment) => void;
}
