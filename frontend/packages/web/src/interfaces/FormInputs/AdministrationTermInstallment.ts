import { BillItemTypeFieldValue } from '../FieldValues/BillIemType';

export interface AdministrationTermInstallmentFormInput {
  installmentId: number | null;
  amount: number | null;
  billItemType: BillItemTypeFieldValue | null;
  dueDate: Date | null;
  installmentNumber: number;
  notes: string;
  since: Date | null;
  until: Date | null;
  guid: string;
}
