import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyWorkTeamFormInput } from '../initialValues';
import { getWorkTeamGeneralDataSchema } from './generalData';

describe('work-team.general-data-schema', () => {
  const schema = getWorkTeamGeneralDataSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyWorkTeamFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyWorkTeamFormInput(),
      internalCode: 'internalCode',
      description: 'description',
      insertionDate: new Date(),
      leaderUser: {},
      providerSubject: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
