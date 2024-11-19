import { AdministrationTermInstallmentFormInput } from '../../interfaces/FormInputs/AdministrationTermInstallment';

type CalcTaxAmountsResult = {
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
};

export const calcTaxAmounts = (taxableAmount: number, taxRatePercent: number): CalcTaxAmountsResult => ({
  taxableAmount,
  taxAmount: (taxableAmount * taxRatePercent) / 100,
  totalAmount: taxableAmount + (taxableAmount * taxRatePercent) / 100,
});

export const calcGroupedInstallmentsTaxAmounts = (
  paymentInstallments: string[],
  installments: AdministrationTermInstallmentFormInput[],
) =>
  paymentInstallments.reduce<CalcTaxAmountsResult>(
    (results, it) => {
      const installment = installments.find(({ guid }) => guid === it);
      const { taxableAmount, taxAmount, totalAmount } = calcTaxAmounts(
        Number(installment?.amount),
        Number(installment?.billItemType?.administrationVR?.ratePercent),
      );
      return {
        taxableAmount: results.taxableAmount + taxableAmount,
        taxAmount: results.taxAmount + taxAmount,
        totalAmount: results.totalAmount + totalAmount,
      };
    },
    { taxableAmount: 0, taxAmount: 0, totalAmount: 0 },
  );
