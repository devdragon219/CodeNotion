import { MIN_DATE, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateGeneralDataSchema } from './generalData';

describe('estate.general-data-schema', () => {
  const schema = getEstateGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateFormInput(),
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
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
