import { CatalogueTypeFieldInput, CustomFieldType, UtilityChargeFieldInput } from '../../gql/types';
import { FormBuilderRowFormInput } from '../../interfaces/FormInputs/FormBuilder';

export const parseFormBuilderRowFormInputsToFieldInputs = <T extends CatalogueTypeFieldInput | UtilityChargeFieldInput>(
  fields: FormBuilderRowFormInput[],
): T[][] =>
  fields.map(({ fields }) =>
    fields.map(
      (field) =>
        ({
          id: field.fieldId,
          isMandatory: field.isMandatory,
          name: field.name,
          type: field.fieldType,
          validValues: field.fieldType === CustomFieldType.SingleItemFromList ? field.validValues : null,
        }) as T,
    ),
  );
