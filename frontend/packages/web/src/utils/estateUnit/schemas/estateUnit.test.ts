import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitSchema } from './estateUnit';

describe('estate-unit.general-data-schema', () => {
  const schema = getEstateUnitSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      internalCode: 'internalCode',
      address: {},
      floors: [{}],
      estateUnitType: 'estateUnitType',
      status: 'status',
      disusedDate: MIN_DATE,
      ownershipStartDate: new Date(),
      ownershipEndDate: new Date(),
      ownershipType: 'ownershipType',
      ownershipPercent: 0,
      usageType: {},
      estate: {},
      officialAct: {
        protocolNumber: 'protocolNumber',
        notaryActDate: new Date(),
        registrationDate: new Date(),
        transcriptionDate: new Date(),
      },
      repossession: {
        eventDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
