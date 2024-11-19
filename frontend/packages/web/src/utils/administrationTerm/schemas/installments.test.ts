import { BillItemType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationTermFormInput, getEmptyAdministrationTermInstallmentFormInput } from '../initialValues';
import { getAdministrationTermInstallmentSchema, getAdministrationTermInstallmentsSchema } from './installments';

describe('administration-term.installments-schema', () => {
  const schema = getAdministrationTermInstallmentsSchema(null, null, 100, [], 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyAdministrationTermFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      installments: [
        {
          ...getEmptyAdministrationTermInstallmentFormInput(0),
          installmentNumber: 0,
          billItemType: {
            administrationVR: {
              ratePercent: 0,
            },
          },
          dueDate: new Date(),
          since: new Date(),
          until: new Date(),
          amount: 0,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('installment', () => {
    const mockTermInstallment = {
      ...getEmptyAdministrationTermInstallmentFormInput(0),
      billItemType: {
        administrationVR: {
          ratePercent: 100,
        },
      } as BillItemType,
    };
    const schema = getAdministrationTermInstallmentSchema(null, null, 100, [mockTermInstallment], 'en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyAdministrationTermInstallmentFormInput(0);
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyAdministrationTermInstallmentFormInput(0),
        installmentNumber: 0,
        billItemType: {
          administrationVR: {
            ratePercent: 10,
          },
        },
        dueDate: new Date(),
        since: new Date(),
        until: new Date(),
        amount: 10,
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
