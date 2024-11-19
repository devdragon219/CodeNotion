import { MIN_DATE, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateSchema } from './estate';

describe('estate.estate-schema', () => {
  const schema = getEstateSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      addresses: [],
      estateType: 'estateType',
      internalCode: 'internalCode',
      status: 'status',
      decommissioningDate: MIN_DATE,
      ownership: 'ownership',
      mainUsageType: {},
      usageType: {},
      buildYear: MIN_YEAR,
      managementSubject: {},
      floors: [{}],
      refactorings: [
        {
          estateUnits: [{}],
          referenceYear: MIN_YEAR,
          buildingPermitYear: MIN_YEAR,
          condition: 'condition',
        },
      ],
      totalMarketValue: {
        coefficients: [
          {
            coefficientType: 'coefficientType',
            value: 0,
          },
        ],
        marketValues: [
          {
            marketValueType: 'marketValueType',
            value: 0,
          },
        ],
        totalSurfaceAreaSqM: 0,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
