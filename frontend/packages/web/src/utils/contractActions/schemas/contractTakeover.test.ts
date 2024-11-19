import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractVariationTakeoverFormInput } from '../initialValues';
import { getContractTakeoverVariationSchema } from './contractTakeover';

describe('contract-actions.contract-takeover-schema', () => {
  const schema = getContractTakeoverVariationSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractVariationTakeoverFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractVariationTakeoverFormInput(),
      counterparts: [{}],
      paymentDate: new Date(),
      takeoverLegalRepresentativeSubject: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
