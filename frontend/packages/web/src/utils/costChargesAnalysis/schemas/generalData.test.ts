import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { CostChargeAnalysisFilterType } from '../../../enums/CostChargeAnalysisFilterType';
import { getEmptyCostChargeAnalysisFilterFormInput } from '../initialValues';
import { getCostChargeAnalysisGeneralDataSchema } from './generalData';

describe('cost-charge-analysis.general-data-schema', () => {
  const schema = getCostChargeAnalysisGeneralDataSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      filters: [
        getEmptyCostChargeAnalysisFilterFormInput(),
        {
          filterType: CostChargeAnalysisFilterType.City,
          value: null,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      filters: [
        {
          filterType: CostChargeAnalysisFilterType.City,
          value: 'city',
        },
        {
          filterType: CostChargeAnalysisFilterType.County,
          value: 'county',
        },
        {
          filterType: CostChargeAnalysisFilterType.Estates,
          value: [
            {
              id: 'estateId',
              internalCode: 'internalCode',
            },
          ],
        },
        {
          filterType: CostChargeAnalysisFilterType.Toponymy,
          value: 'toponymy',
        },
        {
          filterType: CostChargeAnalysisFilterType.UtilityServices,
          value: [
            {
              id: 'utilityServiceId',
              utilityContractCode: 'utilityContractCode',
            },
          ],
        },
        {
          filterType: CostChargeAnalysisFilterType.UtilityTypes,
          value: [
            {
              description: 'description',
              id: 'utilityTypeId',
              internalCode: 'internalCode',
            },
          ],
        },
      ],
    };

    expect(schema.isValidSync(input)).toBe(true);
  });
});
