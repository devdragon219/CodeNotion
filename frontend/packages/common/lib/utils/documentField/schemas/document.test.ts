import { describe, expect, it } from 'vitest';

import { mockTFunction } from '../../../test/utils';
import { getEmptyDocumentFormInput } from '../initialValues';
import { getDocumentSchema } from './document';

describe('document-field.document-schema', () => {
  const schema = getDocumentSchema('en', mockTFunction, {
    fieldsConfig: [{ fieldName: 'name', required: true }],
  });

  it('should fail', () => {
    const input = getEmptyDocumentFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyDocumentFormInput(),
      name: 'name',
      fileName: 'fileName',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
