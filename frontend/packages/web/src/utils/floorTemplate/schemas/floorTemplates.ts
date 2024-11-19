import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getFloorTemplatesSchema = (t: TFunction) =>
  object().shape({
    floorTemplates: array().of(
      object().shape({
        name: string().required(getRequiredTranslation('floor.field.floor_name', t)),
        position: number().required(getRequiredTranslation('floor.field.floor_position', t)),
      }),
    ),
  });
