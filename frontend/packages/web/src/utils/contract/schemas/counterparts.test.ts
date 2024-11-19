import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractCounterpartFormInput, getEmptyContractFormInput } from '../initialValues';
import { getContractCounterpartsSchema } from './counterparts';

describe('contract.counterparts-schema', () => {
  const schemaForPassiveContract = getContractCounterpartsSchema(false, true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractFormInput();
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  it('should fail due to no counterpart', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 100,
        },
      ],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(true);
  });

  it('should fail due to single counterpart and shared percentage not 100', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 10,
        },
      ],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  it('should fail due to no main counterpart', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: false,
          since: new Date(),
          contractSharePercent: 100,
        },
      ],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  it('should fail due to multiple counterparts and shared percentage not 100', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: false,
          since: new Date(),
          contractSharePercent: 10,
        },
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 80,
        },
      ],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  it('should fail due to multiple main counterparts', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 10,
        },
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 90,
        },
      ],
    };
    expect(schemaForPassiveContract.isValidSync(input)).toBe(false);
  });

  const schemaForActiveContract = getContractCounterpartsSchema(true, true, 'en', mockTFunction);

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 100,
        },
      ],
    };
    expect(schemaForActiveContract.isValidSync(input)).toBe(true);
  });

  const schemaForActiveContractWithoutValidateAll = getContractCounterpartsSchema(true, false, 'en', mockTFunction);

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 100,
        },
      ],
    };
    expect(schemaForActiveContractWithoutValidateAll.isValidSync(input)).toBe(true);
  });
});
