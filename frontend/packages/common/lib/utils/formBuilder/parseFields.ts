import { CatalogueTypeField, UtilityChargeField } from '../../gql/types';
import { FormBuilderRowFormInput } from '../../interfaces/FormInputs/FormBuilder';

export const parseFieldsToFormBuilderRowFormInputs = (
  fields: CatalogueTypeField[][] | UtilityChargeField[][],
): FormBuilderRowFormInput[] =>
  fields.map((fields) => ({
    fields: fields.map((field) => ({
      fieldId: field.id,
      fieldType: field.type,
      guid: crypto.randomUUID(),
      isMandatory: field.isMandatory,
      name: field.name,
      validValues: field.validValues ?? [],
    })),
    guid: crypto.randomUUID(),
  }));
