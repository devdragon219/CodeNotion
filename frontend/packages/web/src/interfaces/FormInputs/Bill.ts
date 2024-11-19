import { BillEmissionType, BillingPeriod, PaymentType } from '@realgimm5/frontend-common/gql/types';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { BillItemTypeFieldValue } from '../FieldValues/BillIemType';
import { VatRateFieldValue } from '../FieldValues/VatRate';

export interface BillRowFormInput {
  amount: number | null;
  billItemType: BillItemTypeFieldValue | null;
  billRowId: number | null;
  since: Date | null;
  until: Date | null;
  vatRate: VatRateFieldValue | null;
}

export interface BillFormInput {
  billId: number | null;
  billRows: BillRowFormInput[];
  contractBillingPeriod: BillingPeriod | null;
  contract: {
    counterparts: {
      subjectId: number;
      subjectName: string;
    }[];
    internalCode: string;
    managementSubjectName: string;
    transactors: {
      subjectId: number;
      subjectName: string;
    }[];
    typeDescription: string;
  } | null;
  counterpart: {
    subjectId: number;
    subjectName: string;
  } | null;
  date: Date | null;
  emissionType: BillEmissionType | null;
  estateUnit: {
    address: AsstAddressFragment;
    internalCode: string;
  } | null;
  finalDate: Date | null;
  internalCode: string;
  isInvoiced: boolean;
  isOccupiedWithoutRight: boolean;
  isTemporary: boolean;
  since: Date | null;
  until: Date | null;
  transactorPaymentType: PaymentType | null;
  transactor: {
    subjectId: number;
    subjectName: string;
  } | null;
  year: number | null;
}
