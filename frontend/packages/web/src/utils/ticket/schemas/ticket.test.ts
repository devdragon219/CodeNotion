import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketSchema } from './ticket';

describe('ticket.ticket-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketSchema(true, 'en', FormMode.Create, mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      locationEstateUnit: {},
      internalCode: 'internalCode',
      masterStatus: 'masterStatus',
      requestor: 'requestor',
      requestDateTime: new Date(),
      dueDate: new Date(),
      customType: {},
      priority: 'priority',
      catalogueCategory: {},
      catalogueSubCategory: {},
      catalogueType: {},
      catalogueItems: [{}],
      supplierSubject: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
