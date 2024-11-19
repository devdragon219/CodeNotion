import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractTransactorFormInput } from '../initialValues';
import { getContractTransactorsSchema } from './transactors';

describe('contract.transactors-schema', () => {
  const schema = getContractTransactorsSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      transactors: [
        {
          ...getEmptyContractTransactorFormInput(new Date()),
          transactionSharePercent: 100,
          since: new Date(),
          transactorType: 'transactorType',
          address: {},
          invoiceAddress: {},
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
