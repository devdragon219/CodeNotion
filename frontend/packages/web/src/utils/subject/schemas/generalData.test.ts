import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import { getSubjectGeneralDataSchema } from './generalData';

describe('subject.general-data-schema', () => {
  describe('management-subject', () => {
    const subjectType = SubjectType.ManagementSubject;
    const schema = getSubjectGeneralDataSchema(true, null, 'en', subjectType, mockTFunction);

    it('should fail', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        managementSubject: {},
        entryStatus: 'entryStatus',
        closureDate: MIN_DATE,
        internalCode: 'internalCode',
        managementCode: 'managementCode',
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('other', () => {
    const subjectType = SubjectType.Other;
    const schema = getSubjectGeneralDataSchema(true, null, 'en', subjectType, mockTFunction);

    it('should fail', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        managementSubject: {},
        entryStatus: 'entryStatus',
        internalCode: 'internalCode',
        closureDate: MIN_DATE,
        legalNature: 'legalNature',
        owningManagementSubjects: [{}],
        categories: [''],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
