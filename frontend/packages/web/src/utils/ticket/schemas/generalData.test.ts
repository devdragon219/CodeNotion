import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketGeneralDataSchema } from './generalData';

describe('ticket.general-data-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketGeneralDataSchema(true, 'en', FormMode.Create, mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
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
