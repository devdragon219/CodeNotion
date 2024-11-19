// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TermGroupedInstallmentPaymentFragment = {
  __typename?: 'TermGroupedInstallmentPayment';
  billId: number;
  billDate: string;
  billInternalCode: string;
  billIsTemporary: boolean;
  termInstallments: Array<{
    __typename?: 'TermInstallment';
    id: number;
    amount: number;
    installmentNumber: number;
    billItemType: {
      __typename?: 'BillItemType';
      description: string;
      administrationVR: { __typename?: 'VATRate'; ratePercent: number };
    };
  }>;
};

export const TermGroupedInstallmentPaymentFragmentDoc = gql`
  fragment TermGroupedInstallmentPaymentFragment on TermGroupedInstallmentPayment {
    termInstallments {
      id
      amount
      installmentNumber
      billItemType {
        description
        administrationVR {
          ratePercent
        }
      }
    }
    billId
    billDate
    billInternalCode
    billIsTemporary
  }
`;
