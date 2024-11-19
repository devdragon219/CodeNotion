import { MAX_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractRegistrationTaxFormInput } from '../initialValues';
import { getContractRegistrationTaxSchema } from './registrationTax';

describe('contract.registration-tax-schema', () => {
  const schema = getContractRegistrationTaxSchema(false, 'en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      registrationTax: {
        ...getEmptyContractRegistrationTaxFormInput(true),
        firstRegistrationDate: add(MAX_DATE, { days: 1 }),
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      registrationTax: {
        ...getEmptyContractRegistrationTaxFormInput(),
        tenantShareOfStampTaxPercent: 10,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
