import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistFormInput } from '../initialValues';
import { getTicketChecklistPreventativeMaintenanceSchema } from './preventativeMaintenance';

describe('ticket-checklist.preventative-maintenance-schema', () => {
  const schema = getTicketChecklistPreventativeMaintenanceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistFormInput(),
      preventative: {
        activities: [{}],
        daysOfWeek: [],
        plannedPeriod: 'plannedPeriod',
        toleranceDays: 0,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
