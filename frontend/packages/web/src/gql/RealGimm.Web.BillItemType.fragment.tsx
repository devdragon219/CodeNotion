// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type BillItemTypeFragment = {
  __typename?: 'BillItemType';
  id: number;
  internalCode: string;
  description: string;
  isPositive: boolean;
  isForContractFee: boolean;
  isForContractCosts: boolean;
  isForAdministration: boolean;
  isForTax: boolean;
  defaultAccountingItem?: {
    __typename?: 'AccountingItem';
    id: number;
    description: string;
    internalCode: string;
    externalCode: string;
  } | null;
  activeSubjectVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  activeExemptVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  activeNonTaxableVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  passiveSubjectVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  passiveExemptVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  passiveNonTaxableVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
  administrationVR: {
    __typename?: 'VATRate';
    id: number;
    internalCode: string;
    description: string;
    type: Types.VatRateType;
    ratePercent: number;
  };
};

export const BillItemTypeFragmentDoc = gql`
  fragment BillItemTypeFragment on BillItemType {
    id
    internalCode
    description
    isPositive
    isForContractFee
    isForContractCosts
    isForAdministration
    isForTax
    defaultAccountingItem {
      ...AccountingItemFragment
    }
    activeSubjectVR {
      ...VatRateFragment
    }
    activeExemptVR {
      ...VatRateFragment
    }
    activeNonTaxableVR {
      ...VatRateFragment
    }
    passiveSubjectVR {
      ...VatRateFragment
    }
    passiveExemptVR {
      ...VatRateFragment
    }
    passiveNonTaxableVR {
      ...VatRateFragment
    }
    administrationVR {
      ...VatRateFragment
    }
  }
`;
