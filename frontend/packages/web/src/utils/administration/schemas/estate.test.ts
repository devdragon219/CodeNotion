import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationsFormInput } from '../initialValues';
import { getAdministrationEstateSchema } from './estate';

describe('bill.general-data-schema', () => {
  const schema = getAdministrationEstateSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyAdministrationsFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
