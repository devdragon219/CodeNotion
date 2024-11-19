import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyQualificationLevelFormInput } from '../initialValues';
import { getQualificationLevelSchema } from './qualificationLevel';

describe('qualification-level.qualification-level-schema', () => {
  const schema = getQualificationLevelSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyQualificationLevelFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyQualificationLevelFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
