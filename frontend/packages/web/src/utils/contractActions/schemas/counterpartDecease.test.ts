import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractCounterpartVariationDeceaseFormInput } from '../initialValues';
import {
  getContractCounterpartDeceaseVariationOriginalCounterpartSchema,
  getContractCounterpartDeceaseVariationTakeoverCounterpartsSchema,
} from './counterpartDecease';

describe('contract-actions.counterpart-decease-schema', () => {
  describe('original-counterpart', () => {
    const schema = getContractCounterpartDeceaseVariationOriginalCounterpartSchema(true, mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationDeceaseFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationDeceaseFormInput(),
        originalCounterpart: {},
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('takeover-counterpart', () => {
    const schema = getContractCounterpartDeceaseVariationTakeoverCounterpartsSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationDeceaseFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationDeceaseFormInput(),
        takeoverCounterparts: [{}],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
