import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractCounterpartVariationTransferFormInput } from '../initialValues';
import {
  getContractCounterpartTransferVariationOriginalCounterpartsSchema,
  getContractCounterpartTransferVariationTakeoverCounterpartsSchema,
  getContractCounterpartTransferVariationTransferDataSchema,
} from './counterpartTransfer';

describe('contract-actions.counterpart-transfer-schema', () => {
  describe('takeover-data', () => {
    const schema = getContractCounterpartTransferVariationTransferDataSchema(false, 'en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTransferFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTransferFormInput(),
        takeoverDate: new Date(),
        takeoverLegalRepresentativeSubject: {},
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('takeover-counterparts', () => {
    const schema = getContractCounterpartTransferVariationTakeoverCounterpartsSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTransferFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTransferFormInput(),
        takeoverCounterparts: [{}],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('original-counterparts', () => {
    const schema = getContractCounterpartTransferVariationOriginalCounterpartsSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractCounterpartVariationTransferFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractCounterpartVariationTransferFormInput(),
        originalCounterparts: [{}],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
