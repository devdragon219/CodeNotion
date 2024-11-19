import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityTypeFormInput } from '../initialValues';
import { getUtilityTypeGeneralDataSchema } from './generalData';

describe('utility-type.general-data-schema', () => {
  const schema = getUtilityTypeGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyUtilityTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUtilityTypeFormInput(),
      category: 'category',
      internalCode: 'internalCode',
      description: 'description',
      measurementUnit: 'measurementUnit',
      measurementUnitDescription: 'measurementUnitDescription',
      timeOfUseRateCount: 0,
      meteringType: 'meteringType',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
