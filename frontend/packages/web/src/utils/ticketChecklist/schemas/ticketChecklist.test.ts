import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistFormInput } from '../initialValues';
import { getTicketChecklistSchema } from './ticketChecklist';

describe('ticket-checklist-template.ticket-checklist-template-schema', () => {
  const type = TicketChecklistTemplateType.PreventativeAndOnTriggerCondition;
  const schema = getTicketChecklistSchema(mockTFunction, type);

  it('should fail', () => {
    const input = getEmptyTicketChecklistFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      costBaseFactor: 'costBaseFactor',
      rawWorkCost: 0,
      safetyCost: 0,
      preventative: {
        activities: [{}],
        daysOfWeek: [],
        plannedPeriod: 'plannedPeriod',
        toleranceDays: 0,
      },
      onCondition: {
        activities: [{}],
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
