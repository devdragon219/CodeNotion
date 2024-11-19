import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { ContactsFormInput } from '@realgimm5/frontend-common/interfaces';
import { getContactsSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getAddressesSchema } from '../../components/addressesField/schemas/addresses';

export const getSubjectAddressesAndContactsSchema = (
  entryStatus: EntryStatus | null,
  t: TFunction,
  existingContacts?: ContactsFormInput,
) => getAddressesSchema(entryStatus !== EntryStatus.IncompleteDraft, t).concat(getContactsSchema(t, existingContacts));
