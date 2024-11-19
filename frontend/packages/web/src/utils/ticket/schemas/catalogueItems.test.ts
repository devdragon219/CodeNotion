import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketCatalogueItemsSchema } from './catalogueItems';

describe('ticket.catalogue-items-schema', () => {
  const mainType = TicketMainType.ChecklistOnTriggerCondition;
  const schema = getTicketCatalogueItemsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      catalogueItems: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
