import { AccountingItemFormInput } from '../../interfaces/FormInputs/AccountingItem';

export const getEmptyAccountingItemFormInput = (): AccountingItemFormInput => ({
  accountingItemId: null,
  internalCode: '',
  description: '',
  externalCode: '',
});
