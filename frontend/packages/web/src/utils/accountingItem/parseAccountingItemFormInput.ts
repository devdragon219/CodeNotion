import { AccountingItemInput } from '@realgimm5/frontend-common/gql/types';

import { AccountingItemFormInput } from '../../interfaces/FormInputs/AccountingItem';

export const parseAccountingItemFormInputToAccountingItemInput = (
  accountingItem: AccountingItemFormInput,
): AccountingItemInput => ({
  internalCode: accountingItem.internalCode,
  description: accountingItem.description,
  externalCode: accountingItem.externalCode,
});
