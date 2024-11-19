import { SubValueType, TaxConfigSubValueColumnInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { TaxConfigFieldFormInput } from '../../../interfaces/FormInputs/TaxConfig';

export const parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput = ({
  code,
  fieldType,
  value,
}: TaxConfigFieldFormInput): TaxConfigSubValueColumnInput => {
  const commonProps = {
    code,
    valueType: fieldType,
  };

  switch (fieldType) {
    case SubValueType.Boolean:
      return {
        ...commonProps,
        booleanValue: value,
      };
    case SubValueType.City:
      return {
        ...commonProps,
        stringValue: value?.guid,
      };
    case SubValueType.Currency:
    case SubValueType.Number:
      return {
        ...commonProps,
        numberValue: value,
      };
    case SubValueType.Date:
      return {
        ...commonProps,
        dateValue: parseDateToString(value),
      };
    case SubValueType.String:
      return {
        ...commonProps,
        stringValue: value,
      };
  }
};
