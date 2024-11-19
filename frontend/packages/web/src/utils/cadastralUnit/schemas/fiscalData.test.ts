import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitFiscalDataSchema } from './fiscalData';

describe('cadastral-unit.fiscal-data-schema', () => {
  const schema = getCadastralUnitFiscalDataSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      taxCalculators: [
        {
          fields: [
            [
              {
                isMandatory: true,
              },
            ],
          ],
          name: 'name',
          taxCalculatorId: 'taxCalculatorId',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyCadastralUnitFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});
