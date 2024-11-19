import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractCounterpartVariationTakeoverFormInput } from '../initialValues';
import {
  getContractCounterpartTakeoverVariationOriginalCounterpartsSchema,
  getContractCounterpartTakeoverVariationTakeoverCounterpartsSchema,
  getContractCounterpartTakeoverVariationTakeoverDataSchema,
} from './counterpartTakeover';

describe('contract-actions.counterpart-takeover-schema', () => {
  describe('takeover-data', () => {
    const schema = getContractCounterpartTakeoverVariationTakeoverDataSchema(false, 'en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTakeoverFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTakeoverFormInput(),
        takeoverDate: new Date(),
        takeoverType: 'takeoverType',
        takeoverLegalRepresentativeSubject: {},
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('takeover-counterparts', () => {
    const schema = getContractCounterpartTakeoverVariationTakeoverCounterpartsSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTakeoverFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTakeoverFormInput(),
        takeoverCounterparts: [{}],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('original-counterparts', () => {
    const schema = getContractCounterpartTakeoverVariationOriginalCounterpartsSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTakeoverFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTakeoverFormInput(),
        originalCounterparts: [{}],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
