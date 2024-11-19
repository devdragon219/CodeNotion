import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyReportGeneratorFormInput } from '../initialValues';
import { getReportGeneratorGeneralDataSchema } from './generalData';

describe('report-generator.general-data-schema', () => {
  const schema = getReportGeneratorGeneralDataSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyReportGeneratorFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyReportGeneratorFormInput(),
      report: {},
      formats: ['format'],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
