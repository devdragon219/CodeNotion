import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAddressFormInput } from '../initialValues';
import { getAddressSchema } from './addresses';

describe('addresses-field.addresses-schema', () => {
  const schema = getAddressSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyAddressFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAddressFormInput(),
      addressType: 'addressType',
      countryISO: 'countryISO',
      city: {
        name: 'name',
      },
      toponymy: 'toponymy',
      numbering: 'numbering',
      localPostCode: 'localPostCode',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
