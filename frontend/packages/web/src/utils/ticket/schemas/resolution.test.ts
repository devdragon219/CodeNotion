import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketResolutionSchema } from './resolution';

describe('ticket.resolution-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketResolutionSchema('en', mockTFunction, true);

  it('should fail', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      masterStatus: TicketMasterStatus.Resolved,
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      masterStatus: TicketMasterStatus.Resolved,
      resolution: {
        interventionStart: new Date(),
        interventionEnd: new Date(),
        closure: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
