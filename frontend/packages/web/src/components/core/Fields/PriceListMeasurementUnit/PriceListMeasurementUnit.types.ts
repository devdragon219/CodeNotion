import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { PriceListMeasurementUnitFieldValue } from '../../../../interfaces/FieldValues/PriceListMeasurementUnit';

export type PriceListMeasurementUnitFieldProps = Omit<
  AutocompleteFieldProps<PriceListMeasurementUnitFieldValue>,
  SpecializedAutocompleteOmits
>;
