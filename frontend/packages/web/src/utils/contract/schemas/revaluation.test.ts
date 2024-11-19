import { MAX_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractRevaluationFormInput } from '../initialValues';
import { getContractRevaluationSchema } from './revaluation';

describe('contract.revaluation-schema', () => {
  const schema = getContractRevaluationSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      revaluation: {
        ...getEmptyContractRevaluationFormInput(true),
        referencePeriodStart: add(MAX_DATE, { days: 1 }),
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      revaluation: {
        ...getEmptyContractRevaluationFormInput(),
        tenantShareOfStampTaxPercent: 10,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
