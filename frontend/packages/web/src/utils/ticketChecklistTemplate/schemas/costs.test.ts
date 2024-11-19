import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistTemplateFormInput } from '../initialValues';
import { getTicketChecklistTemplateCostsSchema } from './costs';

describe('ticket-checklist-template.costs-schema', () => {
  const schema = getTicketChecklistTemplateCostsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketChecklistTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketChecklistTemplateFormInput(),
      costBaseFactor: 'costBaseFactor',
      rawWorkCost: 0,
      safetyCost: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
