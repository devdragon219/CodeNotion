import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getConfirmTemporaryRegistryCommunicationGroupsSchema } from './confirmTemporaryRegistryCommunicationGroups';

describe('registry-communication.confirm-temporary-registry-communication-groups-schema', () => {
  const schema = getConfirmTemporaryRegistryCommunicationGroupsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      inputs: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      inputs: [
        {
          date: new Date(),
          debtBankAccount: {},
          requestingSubjectLegalRepresentative: {},
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
