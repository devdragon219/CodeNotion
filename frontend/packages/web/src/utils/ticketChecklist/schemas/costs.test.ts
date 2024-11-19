import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistFormInput } from '../initialValues';
import { getTicketChecklistCostsSchema } from './costs';

describe('ticket-checklist.costs-schema', () => {
  const schema = getTicketChecklistCostsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistFormInput(),
      costBaseFactor: 'costBaseFactor',
      rawWorkCost: 0,
      safetyCost: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
