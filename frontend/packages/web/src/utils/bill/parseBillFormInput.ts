import { BillInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { BillFormInput } from '../../interfaces/FormInputs/Bill';
import { calcBillRowsTotalAmount } from './calcBillRowsTotals';

export const parseBillFormInputToBillInput = (bill: BillFormInput): BillInput => ({
  billRows: bill.billRows.map((billRow) => ({
    amount: billRow.amount!,
    billItemTypeId: billRow.billItemType!.id,
    id: billRow.billRowId,
    since: parseDateToString(billRow.since),
    until: parseDateToString(billRow.until),
    vatRateId: billRow.vatRate!.id,
  })),
  contractBillingPeriod: bill.contractBillingPeriod!,
  emissionType: bill.emissionType!,
  isInvoiced: bill.isInvoiced,
  isOccupiedWithoutRight: bill.isOccupiedWithoutRight,
  mainCounterpartSubjectId: bill.counterpart!.subjectId,
  totalAmount: calcBillRowsTotalAmount(bill.billRows),
  transactorPaymentType: bill.transactorPaymentType!,
  transactorSubjectId: bill.transactor!.subjectId,
  year: bill.year!,
});
