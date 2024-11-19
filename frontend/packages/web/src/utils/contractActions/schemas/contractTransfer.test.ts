import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { ContractFormInput } from '../../../interfaces/FormInputs/Contract';
import { getEmptyContractFormInput } from '../../contract/initialValues';
import { getEmptyContractVariationTransferFormInput } from '../initialValues';
import {
  getContractTransferVariationContractsSchema,
  getContractTransferVariationManagementSubjectSchema,
} from './contractTransfer';

describe('contract-actions.contract-transfer-schema', () => {
  describe('contracts', () => {
    const schema = getContractTransferVariationContractsSchema(mockTFunction);
    const emptyContract = {
      ...getEmptyContractFormInput(),
      contractId: 0,
      contractType: {
        description: '',
      },
    } as ContractFormInput;

    it('should fail', () => {
      const input = {
        ...getEmptyContractVariationTransferFormInput({ ...emptyContract }),
        contracts: [],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptyContractVariationTransferFormInput({ ...emptyContract });
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('management-subject', () => {
    const schema = getContractTransferVariationManagementSubjectSchema('en', mockTFunction);
    const emptyContract = {
      ...getEmptyContractFormInput(),
      contractId: 0,
      contractType: {
        description: '',
      },
    } as ContractFormInput;

    it('should fail', () => {
      const input = getEmptyContractVariationTransferFormInput({ ...emptyContract });
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractVariationTransferFormInput({ ...emptyContract }),
        managementSubject: {},
        paymentDate: new Date(),
        takeoverDate: new Date(),
        takeoverType: 'takeoverType',
        takeoverLegalRepresentativeSubject: {},
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
