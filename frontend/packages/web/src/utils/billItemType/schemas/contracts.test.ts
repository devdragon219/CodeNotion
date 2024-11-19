import { VatRateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillItemTypeFormInput } from '../initialValues';
import { getBillItemTypeContractSchema } from './contracts';

describe('bill-item-type.contracts-schema', () => {
  const schema = getBillItemTypeContractSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyBillItemTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyBillItemTypeFormInput(),
      activeSubjectVR: {},
      activeExemptVR: {},
      activeNonTaxableVR: {},
      administrationVatRateType: VatRateType.Rate,
      administrationVR: {},
      passiveSubjectVR: {},
      passiveExemptVR: {},
      passiveNonTaxableVR: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
