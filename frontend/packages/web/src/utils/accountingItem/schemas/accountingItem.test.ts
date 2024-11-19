import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAccountingItemFormInput } from '../initialValues';
import { getAccountingItemSchema } from './accountingItem';

describe('accounting-item.accounting-item-schema', () => {
  const schema = getAccountingItemSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyAccountingItemFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAccountingItemFormInput(),
      internalCode: 'internalCode',
      description: 'description',
      externalCode: 'externalCode',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
