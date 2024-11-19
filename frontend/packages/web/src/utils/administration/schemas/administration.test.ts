import { AdministrationType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationFormInput, getEmptyAdministrationsFormInput } from '../initialValues';
import { getAdministrationSchema } from './administration';

describe('administration.administration-schema', () => {
  const schemaWithoutExistingAdministrations = getAdministrationSchema([], 'en', mockTFunction);

  it('should fail on empty form input', () => {
    const input = getEmptyAdministrationsFormInput();
    expect(schemaWithoutExistingAdministrations.isValidSync(input)).toBe(false);
  });

  it('should succeed on valid values', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: 'type',
          administratorSubject: {},
          since: new Date(),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithoutExistingAdministrations.isValidSync(input)).toBe(true);
  });

  const schemaWithExpiredAdministration = getAdministrationSchema(
    [
      {
        id: 0,
        administrationType: AdministrationType.Generic,
        since: parseDateToString(new Date('2022-01-01'))!,
        until: parseDateToString(new Date('2022-02-01')),
        isPaymentDataIncluded: true,
        estate: {
          id: 0,
          internalCode: 'internalCode',
        },
        administratorSubject: {
          id: 1,
          name: 'name',
          addresses: [],
        },
      },
    ],
    'en',
    mockTFunction,
  );

  it('should fail on empty form input', () => {
    const input = getEmptyAdministrationsFormInput();
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(false);
  });

  it('should succeed on valid values', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date(),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(true);
  });

  it('should fail on date range inside existing expired administration ones', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date('2022-01-03'),
          until: new Date('2022-01-10'),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail on date range partially inside existing expired administration ones', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date('2022-01-03'),
          until: new Date('2022-04-10'),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail on new unexpired administration', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date('2021-12-03'),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail on date range partially inside existing expired administration ones', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date('2021-12-03'),
          until: new Date('2022-01-10'),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithExpiredAdministration.isValidSync(input)).toBe(false);
  });

  const schemaWithUnexpiredAdministration = getAdministrationSchema(
    [
      {
        id: 0,
        administrationType: AdministrationType.Generic,
        since: parseDateToString(new Date('2022-01-01'))!,
        isPaymentDataIncluded: true,
        estate: {
          id: 0,
          internalCode: 'internalCode',
        },
        administratorSubject: {
          id: 1,
          name: 'name',
          addresses: [],
        },
      },
    ],
    'en',
    mockTFunction,
  );

  it('should fail due to unexpired administration with same type', () => {
    const input = {
      ...getEmptyAdministrationsFormInput(),
      estate: {},
      administrations: [
        {
          ...getEmptyAdministrationFormInput(),
          administrationType: AdministrationType.Generic,
          administratorSubject: {},
          since: new Date('2022-01-03'),
          paymentType: 'paymentType',
          bankAccount: {},
        },
      ],
    };
    expect(schemaWithUnexpiredAdministration.isValidSync(input)).toBe(false);
  });
});
