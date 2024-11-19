import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketTicketChecklistSchema } from './ticketChecklist';

describe('ticket.ticket-checklist-schema', () => {
  const mainType = TicketMainType.ChecklistOnTriggerCondition;
  const schema = getTicketTicketChecklistSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      ticketChecklist: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
