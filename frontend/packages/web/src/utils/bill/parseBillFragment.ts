import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { BillDetailFragment } from '../../gql/RealGimm.Web.Bill.fragment';
import { BillFormInput } from '../../interfaces/FormInputs/Bill';

export const parseBillToBillFormInput = (bill: BillDetailFragment): BillFormInput => ({
  billId: bill.id,
  billRows: bill.billRows.map((billRow) => ({
    amount: billRow.amount,
    billItemType: {
      accountingItemInternalCode: billRow.itemType.defaultAccountingItem?.internalCode ?? '',
      id: billRow.itemType.id,
      description: billRow.itemType.description,
    },
    billRowId: billRow.id,
    since: parseStringToDate(billRow.since),
    until: parseStringToDate(billRow.until),
    vatRate: {
      description: billRow.vatRate.description,
      id: billRow.vatRate.id,
      internalCode: billRow.vatRate.internalCode,
      ratePercent: billRow.vatRate.ratePercent,
    },
  })),
  contractBillingPeriod: bill.contractBillingPeriod,
  contract: bill.contract
    ? {
        counterparts: bill.contract.counterparts.reduce<NonNullable<BillFormInput['contract']>['counterparts']>(
          (acc, { subject }) => [
            ...acc,
            {
              subjectId: subject.id,
              subjectName: subject.name,
            },
          ],
          [],
        ),
        internalCode: bill.contract.internalCode,
        managementSubjectName: bill.contract.managementSubject.name,
        transactors: bill.contract.transactors.reduce<NonNullable<BillFormInput['contract']>['transactors']>(
          (acc, { subject }) => [
            ...acc,
            {
              subjectId: subject.id,
              subjectName: subject.name,
            },
          ],
          [],
        ),
        typeDescription: bill.contract.type.description,
      }
    : null,
  counterpart: {
    subjectId: bill.counterpartSubject.id,
    subjectName: bill.counterpartSubject.name,
  },
  date: parseStringToDate(bill.date),
  emissionType: bill.emissionType,
  estateUnit: bill.estateUnit
    ? {
        address: bill.estateUnit.address,
        internalCode: bill.estateUnit.internalCode,
      }
    : null,
  finalDate: parseStringToDate(bill.finalDate),
  internalCode: bill.internalCode,
  isInvoiced: bill.isInvoiced,
  isOccupiedWithoutRight: bill.isOccupiedWithoutRight,
  isTemporary: bill.isTemporary,
  since: parseStringToDate(bill.since),
  until: parseStringToDate(bill.until),
  transactorPaymentType: bill.transactorPaymentType,
  transactor: {
    subjectId: bill.transactorSubject.id,
    subjectName: bill.transactorSubject.name,
  },
  year: bill.year,
});
