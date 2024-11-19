import { AccountingItemFragment } from '../../gql/RealGimm.Web.AccountingItem.fragment';
import { AccountingItemFormInput } from '../../interfaces/FormInputs/AccountingItem';

export const parseAccountingItemToAccountingItemFormInput = (
  accountingItem: AccountingItemFragment,
): AccountingItemFormInput => ({
  accountingItemId: accountingItem.id,
  internalCode: accountingItem.internalCode,
  description: accountingItem.description,
  externalCode: accountingItem.externalCode,
});
