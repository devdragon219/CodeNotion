import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityServiceFormInput } from '../initialValues';
import { getUtilityServiceEstatesSchema } from './estates';

describe('utility-service.estates-schema', () => {
  const schema = getUtilityServiceEstatesSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyUtilityServiceFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUtilityServiceFormInput(),
      estates: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
