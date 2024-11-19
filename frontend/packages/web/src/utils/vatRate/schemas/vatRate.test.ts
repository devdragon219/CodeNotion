import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyVatRateFormInput } from '../initialValues';
import { getVatRateSchema } from './vatRate';

describe('vat-rate.vat-rate-schema', () => {
  const schema = getVatRateSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyVatRateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyVatRateFormInput(),
      internalCode: 'internalCode',
      description: 'description',
      vatRateType: 'vatRateType',
      ratePercent: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
