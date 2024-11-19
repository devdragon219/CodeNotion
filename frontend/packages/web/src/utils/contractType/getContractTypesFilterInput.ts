import { Month } from '@realgimm5/frontend-common/enums';
import { ContractTypeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter, parseMonthToMonthIndex } from '@realgimm5/frontend-common/utils';

import { ContractTypeFragment } from '../../gql/RealGimm.Web.ContractType.fragment';

export const getContractTypesFilterInput = (
  { id: columnId }: TableColumn<ContractTypeFragment>,
  value: unknown,
): ContractTypeFilterInput => {
  switch (columnId) {
    case 'isActive':
    case 'isRentChargeApplicable':
    case 'isRegistrationTax':
    case 'isStampTax':
    case 'isRevaluationApplicable':
    case 'isAbsoluteRevaluation':
      return createObjectFromKey(columnId, {
        eq: value,
      });
    case 'nature':
    case 'registrationTaxIncomeType':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'registrationTaxPercent':
    case 'registrationTaxTenantPercent':
    case 'revaluationRatePercent':
      return getTableRangeFilter(columnId, value);
    case 'revaluationIndexMonth':
    case 'revaluationCalculationMonth':
      return createObjectFromKey(columnId, {
        in: (value as Month[]).map(parseMonthToMonthIndex),
      });
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
