import { BillRowFormInput } from '../../interfaces/FormInputs/Bill';

interface VatRate {
  amount: number;
  description: string;
  id: number;
  internalCode: string;
  ratePercent: number;
  vat: number;
}

export const getBillRowsVatRates = (billRows: BillRowFormInput[]) =>
  billRows.reduce<VatRate[]>((acc, { amount, vatRate }) => {
    if (!vatRate) return acc;

    const item = acc.find(({ id }) => id === vatRate.id);
    if (!item) {
      return [
        ...acc,
        {
          ...vatRate,
          amount: amount ?? 0,
          vat: ((amount ?? 0) * vatRate.ratePercent) / 100,
        },
      ];
    }

    const totalAmount = item.amount + (amount ?? 0);
    return acc.map((it) =>
      it.id === vatRate.id
        ? {
            ...it,
            amount: totalAmount,
            vat: (totalAmount * vatRate.ratePercent) / 100,
          }
        : it,
    );
  }, []);

export const calcBillRowsTotalIncome = (billRows: BillRowFormInput[]) =>
  billRows.reduce((acc, { amount }) => acc + (amount ?? 0), 0);
export const calcBillRowsTotalVat = (billRows: BillRowFormInput[]) =>
  billRows.reduce((acc, { amount, vatRate }) => acc + ((amount ?? 0) * (vatRate?.ratePercent ?? 0)) / 100, 0);
export const calcBillRowsTotalAmount = (billRows: BillRowFormInput[]) =>
  calcBillRowsTotalIncome(billRows) + calcBillRowsTotalVat(billRows);
