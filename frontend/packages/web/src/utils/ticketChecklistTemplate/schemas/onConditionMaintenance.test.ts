import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistTemplateFormInput } from '../initialValues';
import { getTicketChecklistTemplateOnConditionMaintenanceSchema } from './onConditionMaintenance';

describe('ticket-checklist-template.on-condition-maintenance-schema', () => {
  const schema = getTicketChecklistTemplateOnConditionMaintenanceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistTemplateFormInput(),
      onCondition: {
        activities: [{}],
        interventionType: {},
        craft: {},
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
