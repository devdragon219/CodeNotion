import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getReportGeneratorFieldsSchema } from './fields';

describe('report-generator.fields-schema', () => {
  const schema = getReportGeneratorFieldsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      fields: [
        [
          {
            isMandatory: true,
          },
        ],
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      fields: [
        [
          {
            isMandatory: true,
            value: 'value',
          },
        ],
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
