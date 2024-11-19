import { MAX_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitUnavailabilitiesSchema } from './unavailabilities';

describe('cadastral-unit.unavailabilities-schema', () => {
  const schema = getCadastralUnitUnavailabilitiesSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      unavailabilities: [
        {
          since: add(MAX_DATE, { days: 1 }),
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      unavailabilities: [
        {
          since: new Date(),
          until: new Date(),
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
