import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import {
  getEmptyContractCounterpartFormInput,
  getEmptyContractFormInput,
  getEmptyContractOneshotAdditionFormInput,
  getEmptyContractRatePlanFormInput,
  getEmptyContractRecurringAdditionFormInput,
  getEmptyContractRegistrationTaxFormInput,
  getEmptyContractRevaluationFormInput,
  getEmptyContractSecurityDepositFormInput,
  getEmptyContractTransactorFormInput,
} from '../initialValues';
import { getContractSchema } from './contract';

describe('contract.contract-schema', () => {
  const schema = getContractSchema(true, false, false, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      internalCode: 'internalCode',
      status: 'status',
      managementSubject: {},
      contractType: {},
      reason: 'reason',
      agreementDate: new Date(),
      effectStartDate: new Date(),
      lastRenewalStartDate: new Date(),
      billing: {
        startDate: new Date(),
      },
      locatedUnits: [
        {
          isMainUnit: true,
        },
      ],
      counterparts: [
        {
          ...getEmptyContractCounterpartFormInput(),
          isMainCounterpart: true,
          since: new Date(),
          contractSharePercent: 100,
        },
      ],
      transactors: [
        {
          ...getEmptyContractTransactorFormInput(new Date()),
          transactionSharePercent: 100,
          since: new Date(),
          transactorType: 'transactorType',
          address: {},
          invoiceAddress: {},
        },
      ],
      oneshotAdditions: [
        {
          ...getEmptyContractOneshotAdditionFormInput(),
          accountingItem: {},
          amount: 100,
          billItemType: {},
          startDate: new Date(),
          vatRate: {},
        },
      ],
      recurringAdditions: [
        {
          ...getEmptyContractRecurringAdditionFormInput(),
          accountingItem: {},
          amountPerInstallment: 100,
          billItemType: {},
          vatRate: {},
        },
      ],
      securityDeposits: [
        {
          ...getEmptyContractSecurityDepositFormInput(),
          securityDepositType: 'securityDepositType',
          since: new Date(),
          baseAmount: 100,
        },
      ],
      registrationTax: {
        ...getEmptyContractRegistrationTaxFormInput(),
        tenantShareOfStampTaxPercent: 10,
      },
      ratePlans: [
        {
          ...getEmptyContractRatePlanFormInput(),
          newYearlyRate: 100,
          since: new Date(),
        },
      ],
      revaluation: {
        ...getEmptyContractRevaluationFormInput(),
        tenantShareOfStampTaxPercent: 10,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
