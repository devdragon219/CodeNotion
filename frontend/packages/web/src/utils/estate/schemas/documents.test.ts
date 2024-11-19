import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateDocumentsAndImagesSchema, getEstateDocumentsSchema, getEstateImagesSchema } from './documents';

describe('estate.documents-schema', () => {
  const schema = getEstateDocumentsAndImagesSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      documents: [{}],
      images: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyEstateFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('images', () => {
    const schema = getEstateImagesSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptyEstateFormInput(),
        images: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptyEstateFormInput();
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('documents', () => {
    const schema = getEstateDocumentsSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptyEstateFormInput(),
        documents: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptyEstateFormInput();
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
