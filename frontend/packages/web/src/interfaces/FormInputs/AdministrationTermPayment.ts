export interface AdministrationTermPaymentFormInput {
  billId: number | null;
  installments: string[];
  paymentDate: Date | null;
  billInternalCode: string;
  isBillTemporary: boolean;
}
