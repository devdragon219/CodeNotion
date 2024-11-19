import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketTypeFormInput } from '../initialValues';
import { getTicketTypeSchema } from './ticketType';

describe('ticket-type.ticket-type-schema', () => {
  const schema = getTicketTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketTypeFormInput(),
      internalCode: 'internalCode',
      description: 'description',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
