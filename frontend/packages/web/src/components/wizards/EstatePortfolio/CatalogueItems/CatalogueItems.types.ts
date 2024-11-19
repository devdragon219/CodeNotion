import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';

export interface EstatePortfolioCatalogueItemsStepProps {
  catalogueItemIds: number[];
  estatePortfolio: EstatePortfolioFormInput;
  onChange: (estatePortfolio: EstatePortfolioFormInput) => void;
  onBack: () => void;
  onExport: (portfolio: EstatePortfolioFormInput) => void;
}
