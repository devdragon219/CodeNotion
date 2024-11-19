import { PriceListMeasurementUnitInput } from '@realgimm5/frontend-common/gql/types';

import { PriceListMeasurementUnitFormInput } from '../../interfaces/FormInputs/PriceListMeasurementUnit';

export const parsePriceListMeasurementUnitFormInputToPriceListMeasurementUnitInput = (
  priceListMeasurementUnit: PriceListMeasurementUnitFormInput,
): PriceListMeasurementUnitInput => ({
  internalCode: priceListMeasurementUnit.internalCode,
  name: priceListMeasurementUnit.name,
  ordering: priceListMeasurementUnit.ordering,
});
