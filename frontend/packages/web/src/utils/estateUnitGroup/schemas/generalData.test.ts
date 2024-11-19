import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitGroupFormInput } from '../initialValues';
import { getEstateUnitGroupGeneralDataSchema } from './generalData';

describe('estate-unit-group.general-data-schema', () => {
  const schema = getEstateUnitGroupGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitGroupFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitGroupFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      managementSubject: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
