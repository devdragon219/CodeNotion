import { BillItemTypeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { Applicability } from '../../enums/Applicability';
import { BillItemTypeFragment } from '../../gql/RealGimm.Web.BillItemType.fragment';

const getApplicabilityFilter = (value: Applicability): BillItemTypeFilterInput => {
  switch (value) {
    case Applicability.Administration:
      return {
        isForAdministration: {
          eq: true,
        },
      };
    case Applicability.ContractCosts:
      return {
        isForContractCosts: {
          eq: true,
        },
      };
    case Applicability.ContractFee:
      return {
        isForContractFee: {
          eq: true,
        },
      };
    default:
      return {};
  }
};

export const getBillItemTypesFilterInput = (
  { id: columnId }: TableColumn<BillItemTypeFragment>,
  value: unknown,
): BillItemTypeFilterInput => {
  switch (columnId) {
    case 'isPositive':
      return {
        isPositive: {
          eq: value as boolean,
        },
      };
    case 'applicability':
      return {
        or: (value as Applicability[]).map(getApplicabilityFilter),
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
