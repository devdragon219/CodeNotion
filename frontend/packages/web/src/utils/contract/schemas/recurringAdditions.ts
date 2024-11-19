import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object } from 'yup';

export const getContractRecurringAdditionSchema = (t: TFunction) =>
  object().shape({
    accountingItem: object().required(getRequiredTranslation('contract.field.recurring_addition_accounting_item', t)),
    amountPerInstallment: number().required(
      getRequiredTranslation('contract.field.recurring_addition_amount_per_installment', t),
    ),
    billItemType: object().required(getRequiredTranslation('contract.field.recurring_addition_bill_item', t)),
    vatRate: object().required(getRequiredTranslation('contract.field.recurring_addition_vat_rate', t)),
  });

export const getContractRecurringAdditionsSchema = (t: TFunction) =>
  object().shape({
    recurringAdditions: array().of(getContractRecurringAdditionSchema(t)),
  });
