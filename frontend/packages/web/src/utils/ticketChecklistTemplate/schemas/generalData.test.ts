import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketChecklistTemplateFormInput } from '../initialValues';
import { getTicketChecklistTemplateGeneralDataSchema } from './generalData';

describe('ticket-checklist-template.general-data-schema', () => {
  const schema = getTicketChecklistTemplateGeneralDataSchema(true, mockTFunction);

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
      catalogueType: {},
      ticketChecklistTemplateType: 'ticketChecklistTemplateType',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
