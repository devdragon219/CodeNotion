import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getTaxConfigSchema } from './taxConfig';

describe('tax-config.tax-config-schema', () => {
  const fieldType = SubValueType.String;
  const schema = getTaxConfigSchema(
    [
      {
        canAddRemoveRows: false,
        code: 'subTable',
        columns: [],
      },
    ],
    mockTFunction,
  );

  it('should fail', () => {
    const input = {
      subTables: {
        subTable: [
          {
            config: {
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
          },
        ],
      },
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
      subTables: {
        subTable: [
          {
            config: {
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
          },
        ],
      },
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
