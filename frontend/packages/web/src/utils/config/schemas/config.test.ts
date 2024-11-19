import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyConfigFormInput } from '../initialValues';
import { getConfigSchema } from './config';

describe('config.config-schema', () => {
  const schema = getConfigSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyConfigFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyConfigFormInput(),
      value: 'value',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
