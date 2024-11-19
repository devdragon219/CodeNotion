import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { LegalNature } from '../../../enums/LegalNature';
import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import { getSubjectHeirsSchema, getSubjectOfficersSchema, getSubjectPersonalDataSchema } from './personalData';

describe('subject.personal-data-schema', () => {
  describe('physical-person', () => {
    const subjectType = SubjectType.ManagementSubject;
    const schema = getSubjectPersonalDataSchema(
      true,
      true,
      null,
      true,
      'en',
      LegalNature.PhysicalPerson,
      subjectType,
      mockTFunction,
    );

    it('should fail', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        firstName: 'firstName',
        lastName: 'lastName',
        birthSex: 'birthSex',
        birthDate: new Date(),
        birthLocation: {
          countryISO: 'countryISO',
          city: {
            name: 'cityName',
          },
        },
        birthCountryTaxIdCode: 'birthCountryTaxIdCode',
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('other', () => {
    const subjectType = SubjectType.ManagementSubject;
    const schema = getSubjectPersonalDataSchema(
      true,
      true,
      null,
      true,
      'en',
      LegalNature.Other,
      subjectType,
      mockTFunction,
    );

    it('should fail', () => {
      const input = getEmptySubjectFormInput(subjectType);
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        fullName: 'fullName',
        businessStart: new Date(),
        baseCountryTaxIdCode: 'baseCountryTaxIdCode',
        companyGroup: {
          relation: 'companyGroupRelation',
        },
        interGroupSignature: 'interGroupSignature',
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('heirs', () => {
    const subjectType = SubjectType.ManagementSubject;
    const schema = getSubjectHeirsSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        heirs: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        heirs: [
          {
            heir: {},
            since: new Date(),
          },
        ],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });

  describe('officers', () => {
    const subjectType = SubjectType.ManagementSubject;
    const schema = getSubjectOfficersSchema(null, 'en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        officers: [{}],
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptySubjectFormInput(subjectType),
        officers: [
          {
            officerType: 'officerType',
            officer: {},
            since: new Date(),
            until: new Date(),
          },
        ],
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
