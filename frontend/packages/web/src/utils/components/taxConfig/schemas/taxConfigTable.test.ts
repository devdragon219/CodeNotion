import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getTaxConfigTableSchema } from './taxConfigTable';

describe('tax-config.tax-config-table-schema', () => {
  const fieldType = SubValueType.String;
  const schema = getTaxConfigTableSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      table: {
        fields: [
          {
            code: 'code',
            fieldType,
            isDisabled: false,
            isMandatory: true,
            label: 'label',
            value: '',
          },
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      table: {
        fields: [
          {
            code: 'code',
            fieldType,
            isDisabled: false,
            isMandatory: true,
            label: 'label',
            value: 'value',
          },
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
