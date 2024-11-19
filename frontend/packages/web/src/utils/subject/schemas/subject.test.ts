import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { LegalNature } from '../../../enums/LegalNature';
import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import { getSubjectSchema } from './subject';

describe('subject.subject-schema', () => {
  const subjectType = SubjectType.Other;
  const schema = getSubjectSchema(true, true, true, null, true, 'en', LegalNature.Other, subjectType, mockTFunction);

  it('should fail', () => {
    const input = getEmptySubjectFormInput(subjectType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      addresses: [
        {
          addressType: 'addressType',
          countryISO: 'countryISO',
          city: {
            name: 'cityName',
          },
          toponymy: 'toponymy',
          numbering: 'numbering',
          localPostCode: 'localPostCode',
        },
      ],
      managementSubject: {},
      entryStatus: 'entryStatus',
      internalCode: 'internalCode',
      closureDate: MIN_DATE,
      legalNature: 'legalNature',
      owningManagementSubjects: [{}],
      categories: [''],
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
