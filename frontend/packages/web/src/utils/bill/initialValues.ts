import { BillFormInput, BillRowFormInput } from '../../interfaces/FormInputs/Bill';

export const getEmptyBillRowFormInput = (): BillRowFormInput => ({
  amount: null,
  billItemType: null,
  billRowId: null,
  since: null,
  until: null,
  vatRate: null,
});

export const getEmptyBillFormInput = (): BillFormInput => ({
  billId: null,
  billRows: [],
  contractBillingPeriod: null,
  contract: null,
  counterpart: null,
  date: null,
  emissionType: null,
  estateUnit: null,
  finalDate: null,
  internalCode: '',
  isInvoiced: false,
  isOccupiedWithoutRight: false,
  isTemporary: false,
  since: null,
  until: null,
  transactorPaymentType: null,
  transactor: null,
  year: null,
});
