import { AdministrationInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { AdministrationFormInput } from '../../interfaces/FormInputs/Administration';

export const parseAdministrationFormInputToAdministrationInput = (
  estateId: number,
  input: AdministrationFormInput,
): AdministrationInput => ({
  estateId: estateId,
  administrationType: input.administrationType!,
  administratorSubjectId: input.administratorSubject!.id,
  since: parseDateToString(input.since)!,
  until: parseDateToString(input.until),
  paymentType: input.paymentType!,
  isPaymentDataIncluded: input.isPaymentDataIncluded,
  notes: input.notes,
  administratorBankAccountId: input.bankAccount?.id ?? null,
});
