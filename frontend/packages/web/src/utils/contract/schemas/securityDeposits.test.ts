import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { SecurityDepositType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractSecurityDepositFormInput } from '../initialValues';
import { getContractSecurityDepositsSchema } from './securityDeposits';

describe('contract.security-deposits-schema', () => {
  const schema = getContractSecurityDepositsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      securityDeposits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      securityDeposits: [
        {
          ...getEmptyContractSecurityDepositFormInput(),
          securityDepositType: 'securityDepositType',
          since: new Date(),
          baseAmount: 100,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  it('should fail due to no interest calculation start date provided', () => {
    const input = {
      ...getEmptyContractFormInput(),
      securityDeposits: [
        {
          ...getEmptyContractSecurityDepositFormInput(),
          securityDepositType: 'securityDepositType',
          since: new Date(),
          isInterestCalculated: true,
          baseAmount: 100,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should fail due to takeoverDate before since date', () => {
    const input = {
      ...getEmptyContractFormInput(),
      securityDeposits: [
        {
          ...getEmptyContractSecurityDepositFormInput(),
          securityDepositType: 'securityDepositType',
          since: add(MIN_DATE, { days: 1 }),
          takeoverDate: new Date(MIN_DATE),
          baseAmount: 100,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should fail due to securityDepositType cash and no subject data provided', () => {
    const input = {
      ...getEmptyContractFormInput(),
      securityDeposits: [
        {
          ...getEmptyContractSecurityDepositFormInput(),
          securityDepositType: SecurityDepositType.Cash,
          since: new Date(MIN_DATE),
          baseAmount: 100,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });
});
