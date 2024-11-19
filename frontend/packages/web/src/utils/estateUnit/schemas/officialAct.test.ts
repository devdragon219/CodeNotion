import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitOfficialActSchema } from './officialAct';

describe('estate-unit.official-act-schema', () => {
  const schema = getEstateUnitOfficialActSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      officialAct: {},
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      officialAct: {
        protocolNumber: 'protocolNumber',
        notaryActDate: new Date(),
        registrationDate: new Date(),
        transcriptionDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
