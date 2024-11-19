import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../initialValues';
import { getCatalogueTypeActivitiesSchema } from './activities';

describe('catalogue-type.activities-schema', () => {
  const schema = getCatalogueTypeActivitiesSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueTypeFormInput(),
      activities: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueTypeFormInput(),
      activities: [
        {
          activityType: 'activityType',
          name: 'name',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
