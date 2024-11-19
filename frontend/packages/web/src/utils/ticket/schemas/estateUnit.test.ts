import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketEstateUnitSchema } from './estateUnit';

describe('ticket.estate-unit-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketEstateUnitSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      locationEstateUnit: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
