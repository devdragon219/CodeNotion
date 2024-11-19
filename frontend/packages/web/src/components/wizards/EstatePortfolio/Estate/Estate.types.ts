import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';

export interface EstatePortfolioEstateStepProps {
  estateId: number;
  estatePortfolio: EstatePortfolioFormInput;
  onChange: (estatePortfolio: EstatePortfolioFormInput) => void;
  onNext: () => void;
}
