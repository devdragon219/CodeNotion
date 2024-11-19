import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistsFormInput } from '../initialValues';
import { getTicketChecklistsSchema } from './ticketChecklists';

describe('ticket-checklist.ticket-checklists-schema', () => {
  const schema = getTicketChecklistsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistsFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistsFormInput(),
      estateUnits: [{}],
      ticketChecklistTemplates: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
