import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationTermFormInput, getEmptyAdministrationTermInstallmentFormInput } from '../initialValues';
import { getAdministrationTermSchema } from './administrationTerm';

describe('administration.administration-schema', () => {
  const schema = getAdministrationTermSchema(
    {
      ...getEmptyAdministrationTermFormInput(),
      expectedAmount: 100,
    },
    [],
    'en',
    mockTFunction,
  );

  it('should fail', () => {
    const input = getEmptyAdministrationTermFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      termType: 'termType',
      since: new Date(),
      until: new Date(),
      expectedAmount: 100,
      installments: [
        {
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
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
