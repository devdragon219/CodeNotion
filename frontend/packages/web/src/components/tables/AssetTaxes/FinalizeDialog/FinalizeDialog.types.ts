import { AssetTaxFragment } from '../../../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';

export interface FinalizeAssetTaxesDialogProps {
  currentYear: boolean;
  taxCalculatorId: string;
  onClose: () => void;
  onSave: (assetTaxes: AssetTaxFragment[]) => void;
}
