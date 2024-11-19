import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyTicketFormInput } from '../initialValues';
import { getTicketDocumentsAndImagesSchema, getTicketDocumentsSchema, getTicketImagesSchema } from './documents';

describe('ticket.documents-schema', () => {
  const mainType = TicketMainType.Issue;
  const schema = getTicketDocumentsAndImagesSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyTicketFormInput(mainType),
      images: [{}],
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyTicketFormInput(mainType);
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('images', () => {
    const schema = getTicketImagesSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptyTicketFormInput(mainType),
        images: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptyTicketFormInput(mainType);
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('documents', () => {
    const schema = getTicketDocumentsSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptyTicketFormInput(mainType),
        documents: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptyTicketFormInput(mainType);
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
