import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getTaxConfigSubTableSchema } from './taxConfigSubTable';

describe('tax-config.tax-config-sub-table-schema', () => {
  const fieldType = SubValueType.String;
  const schema = getTaxConfigSubTableSchema('subTable', mockTFunction);

  it('should fail', () => {
    const input = {
      subTables: {
        subTable: [
          {
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
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      subTables: {
        subTable: [
          {
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
        ],
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
