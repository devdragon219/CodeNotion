import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import { getSubjectAddressesAndContactsSchema } from './addressesAndContacts';

describe('subject.addresses-and-contacts-schema', () => {
  const subjectType = SubjectType.ManagementSubject;
  const schema = getSubjectAddressesAndContactsSchema(null, mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      addresses: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      addresses: [
        {
          addressType: 'addressType',
          countryISO: 'countryISO',
          city: {
            name: 'cityName',
          },
          toponymy: 'toponymy',
          numbering: 'numbering',
          localPostCode: 'localPostCode',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
