import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractCounterpartVariationAddFormInput } from '../initialValues';
import { getContractCounterpartAddVariationNewCounterpartsSchema } from './counterpartAdd';

describe('contract-actions.counterpart-add-schema', () => {
  const schema = getContractCounterpartAddVariationNewCounterpartsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractCounterpartVariationAddFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractCounterpartVariationAddFormInput(),
      newCounterparts: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
