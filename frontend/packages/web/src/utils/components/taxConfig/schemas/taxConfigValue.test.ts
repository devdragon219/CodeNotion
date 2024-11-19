import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getTaxConfigValueSchema } from './taxConfigValue';

describe('tax-config.tax-config-value-schema', () => {
  const schema = getTaxConfigValueSchema(mockTFunction);

  Object.values(SubValueType).forEach((fieldType) => {
    const getValue = (valid: boolean) => {
      switch (fieldType) {
        case SubValueType.Boolean:
          return false;
        case SubValueType.City:
          return valid ? { id: 'id' } : null;
        case SubValueType.Currency:
          return valid ? 0 : null;
        case SubValueType.Date:
          return valid ? new Date() : null;
        case SubValueType.Number:
          return valid ? 0 : null;
        case SubValueType.String:
          return valid ? 'value' : '';
      }
    };

    describe(fieldType, () => {
      if (fieldType !== SubValueType.Boolean) {
        it('should fail', () => {
          const input = {
            fields: [
              {
                code: 'code',
                fieldType,
                isDisabled: false,
                isMandatory: true,
                label: 'label',
                value: getValue(false),
              },
            ],
          };
          expect(schema.isValidSync(input)).toBe(false);
        });
      }

      it('should succeed', () => {
        const input = {
          fields: [
            {
              code: 'code',
              fieldType,
              isDisabled: false,
              isMandatory: true,
              label: 'label',
              value: getValue(true),
            },
          ],
        };
        expect(schema.isValidSync(input)).toBe(true);
      });
    });
  });
});
