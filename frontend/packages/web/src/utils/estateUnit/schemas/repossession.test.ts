import { MAX_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitRepossessionSchema } from './repossession';

describe('estate-unit.repossession-schema', () => {
  const schema = getEstateUnitRepossessionSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      repossession: {
        eventDate: add(MAX_DATE, { days: 1 }),
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      repossession: {
        eventDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
