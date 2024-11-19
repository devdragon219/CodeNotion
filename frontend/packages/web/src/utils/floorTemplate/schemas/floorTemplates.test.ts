import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getFloorTemplatesSchema } from './floorTemplates';

describe('floor-template.floor-templates-schema', () => {
  const schema = getFloorTemplatesSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      floorTemplates: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      floorTemplates: [
        {
          name: 'name',
          position: 0,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
