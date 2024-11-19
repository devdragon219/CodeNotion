import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationFormInput, getEmptyAdministrationsFormInput } from '../initialValues';
import { getAdministrationAdministrationsSchema, getAdministrationItemSchema } from './administrations';

describe('administration.administrations-schema', () => {
  const schema = getAdministrationAdministrationsSchema([], 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyAdministrationsFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: 'type',
          administratorSubject: {},
          since: new Date(),
          paymentType: 'paymentType',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('administration-item', () => {
    const schema = getAdministrationItemSchema([], 'en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyAdministrationFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyAdministrationFormInput(),
        administrationType: 'type',
        administratorSubject: {},
        since: new Date(),
        paymentType: 'paymentType',
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
