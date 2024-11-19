import { CustomFieldType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { getEmptyFormBuilderFieldFormInput } from '@realgimm5/frontend-common/utils';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../initialValues';
import { getCatalogueTypeFieldsSchema } from './fields';

describe('catalogue-type.fields-schema', () => {
  const fieldType = CustomFieldType.SingleItemFromList;
  const schema = getCatalogueTypeFieldsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueTypeFormInput(),
      fields: [
        {
          fields: [getEmptyFormBuilderFieldFormInput(fieldType)],
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyCatalogueTypeFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});
