import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistFormInput } from '../initialValues';
import { getTicketChecklistOnConditionMaintenanceSchema } from './onConditionMaintenance';

describe('ticket-checklist.on-condition-maintenance-schema', () => {
  const schema = getTicketChecklistOnConditionMaintenanceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistFormInput(),
      onCondition: {
        activities: [{}],
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
