import { MAX_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitInspectionSchema } from './inspection';

describe('cadastral-unit.inspection-schema', () => {
  const schema = getCadastralUnitInspectionSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      inspection: {
        date: add(MAX_DATE, { days: 1 }),
      },
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      inspection: {
        date: new Date(),
        protocolDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
