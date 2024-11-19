import { AdministrationTermInstallmentFormInput } from '../../interfaces/FormInputs/AdministrationTermInstallment';

export const getGroupedInstallmentsExpenseReasons = (
  paymentInstallments: string[],
  installments: AdministrationTermInstallmentFormInput[],
) =>
  paymentInstallments
    .reduce<string[]>((reasons, it) => {
      const installment = installments.find(({ guid }) => guid === it);
      const expenseReason = String(installment?.billItemType?.description);
      return expenseReason in reasons ? [...reasons] : [...reasons, expenseReason];
    }, [])
    .join(', ');
