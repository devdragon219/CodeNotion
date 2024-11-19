import { ConfirmTemporaryRegistryCommunicationGroupInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { ConfirmTemporaryRegistryCommunicationGroupFormInput } from '../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';

export const parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput =
  (inputs: ConfirmTemporaryRegistryCommunicationGroupFormInput[]): ConfirmTemporaryRegistryCommunicationGroupInput[] =>
    inputs.map((input) => ({
      date: parseDateToString(input.date)!,
      debtBankAccountId: input.debtBankAccount!.id,
      managementSubjectId: input.managementSubject.id,
      requestingSubjectLegalRepresentativeId: input.requestingSubjectLegalRepresentative!.id,
    }));
