import { describe, expect, it } from 'vitest';

import { mockTFunction } from '../../../test/utils';
import { getEmptyContactFormInput, getEmptyContactsFormInput } from '../initialValues';
import { getContactsSchema } from './contacts';

describe('contacts-field.contacts-schema', () => {
  const schema = getContactsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      contacts: {
        ...getEmptyContactsFormInput(),
        emails: [
          {
            ...getEmptyContactFormInput(),
            contactInfoType: 'contactInfoType',
            contactInfo: 'test@gmail',
          },
        ],
        phones: [
          {
            ...getEmptyContactFormInput(),
            contactInfoType: 'contactInfoType',
            contactInfo: 'contactInfo',
          },
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      contacts: {
        ...getEmptyContactsFormInput(),
        emails: [
          {
            ...getEmptyContactFormInput(),
            contactInfoType: 'contactInfoType',
            contactInfo: 'test@gmail.com',
          },
        ],
        phones: [
          {
            ...getEmptyContactFormInput(),
            contactInfoType: 'contactInfoType',
            contactInfo: '333333333',
          },
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
