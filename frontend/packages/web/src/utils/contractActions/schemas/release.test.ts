import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractReleaseFormInput } from '../initialValues';
import { getContractReleaseSchema } from './release';

describe('contract-actions.release-schema', () => {
  const schema = getContractReleaseSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractReleaseFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractReleaseFormInput(),
      date: new Date(),
      reason: 'reason',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
