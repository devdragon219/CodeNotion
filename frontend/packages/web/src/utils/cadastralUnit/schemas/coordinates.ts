import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getCadastralUnitCoordinatesSchema = (coordinateType: CoordinateType, t: TFunction) =>
  object().shape({
    coordinates: array().of(
      object().shape({
        level2: string().requiredIf(
          coordinateType === CoordinateType.ItalianOrdinary,
          getRequiredTranslation('cadastral_unit.field.coordinate_level2', t),
        ),
        level3: string().requiredIf(
          coordinateType === CoordinateType.ItalianOrdinary,
          getRequiredTranslation('cadastral_unit.field.coordinate_level3', t),
        ),
        level4: string().requiredIf(
          coordinateType === CoordinateType.ItalianOrdinary,
          getRequiredTranslation('cadastral_unit.field.coordinate_level4', t),
        ),
      }),
    ),
  });
