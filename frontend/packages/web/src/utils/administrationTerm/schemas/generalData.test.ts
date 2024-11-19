import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { TermType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationFormInput } from '../../administration/initialValues';
import { getEmptyAdministrationTermFormInput, getEmptyAdministrationTermInstallmentFormInput } from '../initialValues';
import { getAdministrationTermGeneralDataSchema } from './generalData';

describe('administration-term.general-data-schema', () => {
  const schema = getAdministrationTermGeneralDataSchema([], 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyAdministrationTermFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: 'termType',
      since: new Date(),
      until: new Date(),
      expectedAmount: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  const schemaWithExistingAdministrationTermsAndAdministration = getAdministrationTermGeneralDataSchema(
    [
      {
        id: 0,
        termType: TermType.Generic,
        name: 'name',
        expectedAmount: 100,
        since: parseDateToString(add(MIN_DATE, { days: 2 }))!,
        until: parseDateToString(add(MIN_DATE, { days: 10 }))!,
        installments: [],
      },
    ],
    'en',
    mockTFunction,
    {
      ...getEmptyAdministrationFormInput(),
      since: add(MIN_DATE, { days: 1 }),
      until: add(MIN_DATE, { days: 20 }),
    },
  );

  it('should fail due to administration term date inside existing term ones', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 3 }),
      until: add(MIN_DATE, { days: 4 }),
      expectedAmount: 10,
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail due to administration term date partially inside existing term ones', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 1 }),
      until: add(MIN_DATE, { days: 5 }),
      expectedAmount: 10,
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail due to administration term date partially inside existing term ones', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 5 }),
      until: add(MIN_DATE, { days: 15 }),
      expectedAmount: 10,
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(false);
  });

  it('should fail due to administration term date range outside administration date range', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 25 }),
      until: add(MIN_DATE, { days: 26 }),
      expectedAmount: 10,
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(false);
  });

  it('should succeed on valid values', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 10 }),
      until: add(MIN_DATE, { days: 11 }),
      expectedAmount: 100,
      installments: [
        {
          ...getEmptyAdministrationTermInstallmentFormInput(1),
          amount: 80,
        },
      ],
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(true);
  });

  it('should fail due to installmentTotal greater than expected amount', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: TermType.Generic,
      since: add(MIN_DATE, { days: 15 }),
      until: add(MIN_DATE, { days: 20 }),
      expectedAmount: 100,
      installments: [
        {
          ...getEmptyAdministrationTermInstallmentFormInput(1),
          amount: 110,
          billItemType: {
            administrationVR: {
              ratePercent: 10,
            },
          },
        },
      ],
    };
    expect(schemaWithExistingAdministrationTermsAndAdministration.isValidSync(input)).toBe(false);
  });
});
