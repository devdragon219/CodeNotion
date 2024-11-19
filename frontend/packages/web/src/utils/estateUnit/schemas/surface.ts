import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, ref } from 'yup';

import { SurfaceMode } from '../../../enums/SurfaceMode';

export const getEstateUnitSurfaceAreaSchema = (t: TFunction) =>
  object().shape({
    surfaceSqMCommonArea: number().nullable().max(ref('surfaceSqMTotal'), t('estate_unit.error.surface_common_area')),
    surfaceSqMSideArea: number().nullable().max(ref('surfaceSqMTotal'), t('estate_unit.error.surface_side_area')),
    surfaceSqMTotal: number()
      .nullable()
      .when(['surfaceSqMCommonArea', 'surfaceSqMSideArea'], ([surfaceSqMCommonArea, surfaceSqMSideArea], schema) =>
        schema.min(
          ((surfaceSqMCommonArea as number | null) ?? 0) + ((surfaceSqMSideArea as number | null) ?? 0),
          t('estate_unit.error.surface_total_area'),
        ),
      ),
  });

export const getEstateUnitSurfaceSchema = (surfaceMode: SurfaceMode, t: TFunction) =>
  object()
    .shape({
      floors: array().of(
        object()
          .shape({
            floor: object()
              .nullable()
              .requiredIf(
                surfaceMode !== SurfaceMode.Total,
                getRequiredTranslation('estate_unit.field.surface_floor', t),
              ),
          })
          .concat(getEstateUnitSurfaceAreaSchema(t)),
      ),
    })
    .concat(getEstateUnitSurfaceAreaSchema(t));
