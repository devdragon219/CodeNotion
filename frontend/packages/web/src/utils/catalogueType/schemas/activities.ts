import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getCatalogueTypeActivitiesSchema = (t: TFunction) =>
  object().shape({
    activities: array().of(
      object().shape({
        activityType: string().required(getRequiredTranslation('catalogue_type.field.activity_type', t)),
        name: string().required(getRequiredTranslation('catalogue_type.field.activity_name', t)),
      }),
    ),
  });
