import { FormMode } from '@realgimm5/frontend-common/enums';
import { QuoteMasterStatus, TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketQuoteSchema } from './quote';

describe('ticket.quote-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketQuoteSchema('en', FormMode.Edit, mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      isExcludedFromMaintenanceContract: true,
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      isExcludedFromMaintenanceContract: true,
      quote: {
        masterStatus: QuoteMasterStatus.New,
        interventionDueDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
