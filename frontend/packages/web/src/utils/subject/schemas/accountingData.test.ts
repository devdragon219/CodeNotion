import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { SubjectType } from '../../../enums/SubjectType';
import { getEmptySubjectFormInput } from '../initialValues';
import { getSubjectAccountingDataSchema } from './accountingData';

describe('subject.accounting-data-schema', () => {
  const subjectType = SubjectType.ManagementSubject;
  const schema = getSubjectAccountingDataSchema(null, 'en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      bankAccounts: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptySubjectFormInput(subjectType),
      bankAccounts: [
        {
          referenceCode: 'GB33BUKB20201555555555',
          accountHolder: 'accountHolder',
        },
      ],
      taxStatusSplitPayment: {
        since: new Date(),
        until: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
