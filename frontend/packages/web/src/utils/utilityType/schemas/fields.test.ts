import { CustomFieldType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { getEmptyFormBuilderFieldFormInput } from '@realgimm5/frontend-common/utils';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityTypeFormInput } from '../initialValues';
import { getUtilityTypeFieldsSchema } from './fields';

describe('utility-type.fields-schema', () => {
  const fieldType = CustomFieldType.SingleItemFromList;
  const schema = getUtilityTypeFieldsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyUtilityTypeFormInput(),
      fields: [
        {
          fields: [getEmptyFormBuilderFieldFormInput(fieldType)],
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyUtilityTypeFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});
