import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistFormInput } from '../initialValues';
import { getTicketChecklistGeneralDataSchema } from './generalData';

describe('ticket-checklist.general-data-schema', () => {
  const schema = getTicketChecklistGeneralDataSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
