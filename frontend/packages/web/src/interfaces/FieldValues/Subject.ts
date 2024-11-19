import { AddressFragment } from '../../gql/RealGimm.Web.Address.fragment';
import { BankAccountFragment } from '../../gql/RealGimm.Web.BankAccount.fragment';
import { ContactFragment } from '../../gql/RealGimm.Web.Contact.fragment';

export interface SubjectFieldValue {
  addresses?: AddressFragment[];
  bankAccounts?: BankAccountFragment[];
  contacts?: ContactFragment[];
  id: number;
  internalCode?: string;
  name: string;
  officers?: {
    id: number;
    name: string;
  }[];
  vatNumber?: string;
}
