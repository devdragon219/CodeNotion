import { RegistrationTaxIncomeType, RegistrationTaxIncomeTypeRli } from '@realgimm5/frontend-common/gql/types';

const getRegistrationTaxAppliedRateRli = (incomeTypeRli: RegistrationTaxIncomeTypeRli | null) => {
  if (!incomeTypeRli) {
    return null;
  }

  switch (incomeTypeRli) {
    case RegistrationTaxIncomeTypeRli.ItaL1Residential:
      return '2%';
    case RegistrationTaxIncomeTypeRli.ItaL2ResidentialDiscount:
      return '2% del 70% del canone';
    case RegistrationTaxIncomeTypeRli.ItaL3ResidentialWithVat:
      return '€ 67';
    case RegistrationTaxIncomeTypeRli.ItaL4ResidentialFinancial:
      return '€ 200';
    case RegistrationTaxIncomeTypeRli.ItaS1Nonresidential:
      return '2%';
    case RegistrationTaxIncomeTypeRli.ItaS2InstrumentalWithVat:
      return '1%';
    case RegistrationTaxIncomeTypeRli.ItaS3NonresidentialFinancial:
      return '€ 200';
    case RegistrationTaxIncomeTypeRli.ItaT1Farmland:
      return '0.50%';
    case RegistrationTaxIncomeTypeRli.ItaT2FarmlandDiscount:
      return '€ 67';
    case RegistrationTaxIncomeTypeRli.ItaT3NonbuildableLand:
      return '2%';
    case RegistrationTaxIncomeTypeRli.ItaT4NonbuildableParkingWithVat:
      return '€ 67';
  }
};

export const getRegistrationTaxAppliedRate = (
  isRliModeEnabled: boolean,
  incomeType: RegistrationTaxIncomeType | null,
  incomeTypeRli: RegistrationTaxIncomeTypeRli | null,
) => {
  if (isRliModeEnabled) {
    return getRegistrationTaxAppliedRateRli(incomeTypeRli);
  }

  if (!incomeType) {
    return null;
  }

  switch (incomeType) {
    case RegistrationTaxIncomeType.Farmland:
      return '0.50%';
    case RegistrationTaxIncomeType.NonresidentialLeasing:
    case RegistrationTaxIncomeType.NonresidentialLeasingWithVat:
    case RegistrationTaxIncomeType.NonresidentialRental:
    case RegistrationTaxIncomeType.NonresidentialRentalLaw133Art6:
    case RegistrationTaxIncomeType.NonresidentialRentalLaw633Art10:
    case RegistrationTaxIncomeType.NonresidentialRentalWithVat:
      return '1%';
    case RegistrationTaxIncomeType.OtherEstates:
      return '2%';
    case RegistrationTaxIncomeType.OtherLeasing:
      return '100%';
    case RegistrationTaxIncomeType.OtherRentalLaw133Art6:
    case RegistrationTaxIncomeType.OtherRentalLaw633Art10:
    case RegistrationTaxIncomeType.ResidentialLeasing:
    case RegistrationTaxIncomeType.ResidentialRentalByBuilders:
    case RegistrationTaxIncomeType.ResidentialRentalLaw133Art6:
    case RegistrationTaxIncomeType.ResidentialRentalLaw633Art10:
    case RegistrationTaxIncomeType.UrbanEstates:
      return '2%';
  }
};
