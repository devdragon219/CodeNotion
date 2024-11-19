import { SurfaceMeasurementMetric } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { SurfaceMode } from '../../../enums/SurfaceMode';
import { getEmptyEstateUnitSurfaceFormInput } from '../initialValues';
import { getEstateUnitSurfaceAreaSchema, getEstateUnitSurfaceSchema } from './surface';

describe('estate-unit.surface-schema', () => {
  const schema = getEstateUnitSurfaceSchema(SurfaceMode.Floor, mockTFunction);
  const metric = SurfaceMeasurementMetric.Rooms;

  it('should fail', () => {
    const input = {
      ...getEmptyEstateUnitSurfaceFormInput(metric),
      floors: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitSurfaceFormInput(metric),
      floors: [
        {
          floor: {},
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('surface-area', () => {
    const schema = getEstateUnitSurfaceAreaSchema(mockTFunction);
    const metric = SurfaceMeasurementMetric.Rooms;

    it('should fail', () => {
      const input = {
        ...getEmptyEstateUnitSurfaceFormInput(metric),
        surfaceSqMCommonArea: 10,
        surfaceSqMSideArea: 10,
        surfaceSqMTotal: 0,
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyEstateUnitSurfaceFormInput(metric),
        surfaceSqMCommonArea: 0,
        surfaceSqMSideArea: 0,
        surfaceSqMTotal: 0,
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});
