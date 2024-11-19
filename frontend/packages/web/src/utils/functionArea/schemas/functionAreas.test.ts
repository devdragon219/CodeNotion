import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getFunctionAreasSchema } from './functionAreas';

describe('function-area.function-areas-schema', () => {
  const schema = getFunctionAreasSchema({}, mockTFunction);

  it('should fail', () => {
    const input = {
      functionAreas: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      functionAreas: [
        {
          internalCode: 'internalCode',
          name: 'name',
          surfaceType: 'surfaceType',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
