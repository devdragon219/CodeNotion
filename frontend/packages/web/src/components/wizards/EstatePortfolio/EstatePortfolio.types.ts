import { EstatePortfolioFormInput } from '../../../interfaces/FormInputs/EstatePortfolio';

export interface EstatePortfolioExportDialogProps {
  catalogueItemIds: number[];
  estateId: number;
  estateUnitIds: number[];
  onClose: () => void;
  onExportSubmit: (portfolio: EstatePortfolioFormInput) => void;
}
