import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistTemplateFormInput } from '../initialValues';
import { getTicketChecklistTemplateSchema } from './ticketChecklistTemplate';

describe('ticket-checklist-template.ticket-checklist-template-schema', () => {
  const type = TicketChecklistTemplateType.PreventativeAndOnTriggerCondition;
  const schema = getTicketChecklistTemplateSchema(true, mockTFunction, type);

  it('should fail', () => {
    const input = getEmptyTicketChecklistTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistTemplateFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      catalogueCategory: {},
      catalogueSubCategory: {},
      ticketChecklistTemplateType: 'ticketChecklistTemplateType',
      catalogueType: {},
      costBaseFactor: 'costBaseFactor',
      rawWorkCost: 0,
      safetyCost: 0,
      preventative: {
        activities: [{}],
        craft: {},
        daysOfWeek: [],
        interventionType: {},
        plannedPeriod: 'plannedPeriod',
        toleranceDays: 0,
      },
      onCondition: {
        craft: {},
        activities: [{}],
        interventionType: {},
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
