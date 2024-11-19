import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyWorkerFormInput } from '../initialValues';
import { getWorkersSchema } from './workers';

describe('workers.workers-schema', () => {
  const schema = getWorkersSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      workers: [getEmptyWorkerFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
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
