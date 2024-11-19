import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketRemindersSchema } from './reminders';

describe('ticket.reminders-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketRemindersSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      reminders: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(true);
  });
});
