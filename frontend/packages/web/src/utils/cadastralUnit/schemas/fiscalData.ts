import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { ParseKeys, TFunction } from 'i18next';
import { array, object, string } from 'yup';

import { CadastralUnitFormViewerFieldFormInput } from '../../../interfaces/FormInputs/CadastralUnit';

export const getCadastralUnitFiscalDataSchema = (
  t: TFunction,
  referenceFields?: CadastralUnitFormViewerFieldFormInput[],
) =>
  object().shape({
    taxCalculators: array().of(
      object().shape({
        fields: array().of(
          array().of(
            object().shape({
              value: string().when(
                ['isMandatory', 'name', 'taxCalculatorId', 'templateTypeId'],
                ([isMandatory, name, taxCalculatorId, templateTypeId], schema) => {
                  const referenceField = referenceFields?.find((field) => field.taxCalculatorId === taxCalculatorId);
                  if (
                    !referenceField ||
                    referenceField.templateTypeId === templateTypeId ||
                    referenceField.value === 'true'
                  ) {
                    return schema.requiredIf(isMandatory as boolean, getRequiredTranslation(name as ParseKeys, t));
                  }

                  return schema;
                },
              ),
            }),
          ),
        ),
      }),
    ),
  });
