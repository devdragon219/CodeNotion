import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyWorkerFormInput } from '../../components/worker/initialValues';
import { getEmptyWorkTeamFormInput } from '../initialValues';
import { getWorkTeamSchema } from './workTeam';

describe('work-team.work-team-schema', () => {
  const schema = getWorkTeamSchema(true, 'en', mockTFunction);

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
      workers: [
        {
          ...getEmptyWorkerFormInput(),
          firstName: 'firstName',
          lastName: 'lastName',
          since: new Date(),
          craft: {},
          qualificationLevel: {},
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
