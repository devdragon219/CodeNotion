import { VatRateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillItemTypeFormInput } from '../initialValues';
import { getBillItemTypeSchema } from './billItemType';

describe('bill-item-type.bill-item-type-schema', () => {
  const schema = getBillItemTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyBillItemTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyBillItemTypeFormInput(),
      internalCode: 'internalCode',
      description: 'description',
      isPositive: true,
      applicability: ['applicability'],
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
