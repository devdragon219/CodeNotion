import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistTemplateFormInput } from '../initialValues';
import { getTicketChecklistTemplatePreventativeMaintenanceSchema } from './preventativeMaintenance';

describe('ticket-checklist-template.preventative-maintenance-schema', () => {
  const schema = getTicketChecklistTemplatePreventativeMaintenanceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistTemplateFormInput(),
      preventative: {
        activities: [{}],
        craft: {},
        daysOfWeek: [],
        interventionType: {},
        plannedPeriod: 'plannedPeriod',
        toleranceDays: 0,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
