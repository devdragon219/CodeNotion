import { describe, expect, it } from 'vitest';

import { mockTFunction } from '../../../test/utils';
import { getFormViewerSchema } from './formViewer';

describe('form-viewer.fields-schema', () => {
  const schema = getFormViewerSchema(mockTFunction);

  it('should fail', () => {
    const input = [
      [
        {
          isMandatory: true,
        },
      ],
    ];
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = [
      [
        {
          isMandatory: true,
          value: 'value',
        },
      ],
    ];
    expect(schema.isValidSync(input)).toBe(true);
  });
});
