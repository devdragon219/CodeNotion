import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput } from '../initialValues';
import { getContractLocatedUnitsSchema } from './locatedUnits';

describe('contract.located-units-schema', () => {
  const schemaWithoutValidateAll = getContractLocatedUnitsSchema(false, false, mockTFunction);

  it('should fail on empty form input', () => {
    const input = getEmptyContractFormInput();
    expect(schemaWithoutValidateAll.isValidSync(input)).toBe(false);
  });

  it('should succeed on minimum valid values', () => {
    const input = {
      ...getEmptyContractFormInput(),
      locatedUnits: [
        {
          isMainUnit: true,
        },
      ],
    };

    expect(schemaWithoutValidateAll.isValidSync(input)).toBe(true);
  });

  const schemaWithValidateAll = getContractLocatedUnitsSchema(false, true, mockTFunction);

  it('should fail due to multiple main units', () => {
    const input = {
      ...getEmptyContractFormInput(),
      locatedUnits: [
        {
          isMainUnit: true,
        },
        {
          isMainUnit: true,
        },
      ],
    };

    expect(schemaWithValidateAll.isValidSync(input)).toBe(false);
  });

  it('should fail due to no main units', () => {
    const input = {
      ...getEmptyContractFormInput(),
      locatedUnits: [
        {
          isMainUnit: false,
        },
      ],
    };

    expect(schemaWithValidateAll.isValidSync(input)).toBe(false);
  });

  const schemaForPassiveContract = getContractLocatedUnitsSchema(true, true, mockTFunction);

  it('should succeed on minimum valid values', () => {
    const input = {
      ...getEmptyContractFormInput(),
      locatedUnits: [
        {
          isMainUnit: true,
        },
      ],
    };

    expect(schemaForPassiveContract.isValidSync(input)).toBe(true);
  });
});
