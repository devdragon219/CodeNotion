import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillItemTypeFormInput } from '../initialValues';
import { getBillItemTypeGeneralDataSchema } from './generalData';

describe('bill-item-type.general-data-schema', () => {
  const schema = getBillItemTypeGeneralDataSchema(true, mockTFunction);

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
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
