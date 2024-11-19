import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';

export interface EstatePortfolioEstateUnitsStepProps {
  estatePortfolio: EstatePortfolioFormInput;
  estateUnitIds: number[];
  onChange: (estatePortfolio: EstatePortfolioFormInput) => void;
  onBack: () => void;
  onNext: () => void;
}
