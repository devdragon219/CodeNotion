import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../../catalogueType/initialValues';
import { getEmptyCatalogueItemFormInput } from '../initialValues';
import { getCatalogueItemSchema } from './catalogueItem';

describe('catalogue-item.catalogue-item-schema', () => {
  const schema = getCatalogueItemSchema({}, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput());
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: 'status',
      activationDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
