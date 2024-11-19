import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import {
  getSubjectDocumentsSchema,
  getSubjectIdentityDocumentsSchema,
  getSubjectOtherDocumentsSchema,
} from './documents';

describe('subject.documents-schema', () => {
  const schema = getSubjectDocumentsSchema(null, 'en', mockTFunction);
  const subjectType = SubjectType.ManagementSubject;

  it('should fail', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      documents: {
        identities: [{}],
        others: [{}],
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptySubjectFormInput(subjectType);
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('identity-documents', () => {
    const schema = getSubjectIdentityDocumentsSchema(null, 'en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        documents: {
          identities: [{}],
        },
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('other-documents', () => {
    const schema = getSubjectOtherDocumentsSchema(null, 'en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        documents: {
          others: [{}],
        },
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
