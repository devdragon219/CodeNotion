import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketFacilityContractSchema } from './facilityContract';

describe('ticket.facility-contract-schema', () => {
  const mainType = TicketMainType.ChecklistOnTriggerCondition;
  const schema = getTicketFacilityContractSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      facilityContract: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
