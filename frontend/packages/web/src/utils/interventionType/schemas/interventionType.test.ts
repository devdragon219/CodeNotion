import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyInterventionTypeFormInput } from '../initialValues';
import { getInterventionTypeSchema } from './interventionType';

describe('intervention-type.intervention-type-schema', () => {
  const schema = getInterventionTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyInterventionTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyInterventionTypeFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
