import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitGeneralDataSchema } from './generalData';

describe('estate-unit.general-data-schema', () => {
  const schema = getEstateUnitGeneralDataSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      internalCode: 'internalCode',
      address: {},
      floors: [{}],
      estateUnitType: 'estateUnitType',
      status: 'status',
      disusedDate: MIN_DATE,
      ownershipStartDate: new Date(),
      ownershipEndDate: new Date(),
      ownershipType: 'ownershipType',
      ownershipPercent: 0,
      usageType: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
