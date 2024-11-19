import { ParseKeys, TFunction } from 'i18next';
import { array, object, string } from 'yup';

import { getRequiredTranslation } from '../../translationUtils';

export const getFormViewerSchema = (t: TFunction) =>
  array().of(
    array().of(
      object().shape({
        value: string().when(['isMandatory', 'name'], ([isMandatory, name], schema) =>
          schema.requiredIf(isMandatory as boolean, getRequiredTranslation(name as ParseKeys, t)),
        ),
      }),
    ),
  );
