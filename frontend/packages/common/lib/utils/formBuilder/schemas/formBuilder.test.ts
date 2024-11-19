import { describe, expect, it } from 'vitest';

import { CustomFieldType } from '../../../gql/types';
import { mockTFunction } from '../../../test/utils';
import { getEmptyFormBuilderFieldFormInput } from '../initialValues';
import { getFormBuilderSchema } from './formBuilder';

describe('form-builder.fields-schema', () => {
  const fieldType = CustomFieldType.SingleItemFromList;
  const schema = getFormBuilderSchema(mockTFunction);

  it('should fail', () => {
    const input = [
      {
        fields: [getEmptyFormBuilderFieldFormInput(fieldType)],
      },
    ];
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = [
      {
        fields: [
          {
            ...getEmptyFormBuilderFieldFormInput(fieldType),
            name: 'name',
            validValues: ['validValue'],
          },
        ],
      },
    ];
    expect(schema.isValidSync(input)).toBe(true);
  });
});
