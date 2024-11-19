import { PriceListMeasurementUnitFormInput } from '../../interfaces/FormInputs/PriceListMeasurementUnit';

export const getEmptyPriceListMeasurementUnitFormInput = (): PriceListMeasurementUnitFormInput => ({
  internalCode: '',
  name: '',
  ordering: 0,
  priceListMeasurementUnitId: null,
});
