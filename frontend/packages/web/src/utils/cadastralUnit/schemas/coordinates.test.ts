import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralCoordinatesFormInput, getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitCoordinatesSchema } from './coordinates';

describe('cadastral-unit.coordinates-schema', () => {
  const coordinateType = CoordinateType.ItalianOrdinary;
  const schema = getCadastralUnitCoordinatesSchema(coordinateType, mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      coordinates: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      coordinates: [
        {
          ...getEmptyCadastralCoordinatesFormInput(coordinateType),
          level2: 'level2',
          level3: 'level3',
          level4: 'level4',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
