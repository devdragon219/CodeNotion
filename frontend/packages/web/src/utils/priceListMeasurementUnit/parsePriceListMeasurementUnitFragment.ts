import { PriceListMeasurementUnitFragment } from '../../gql/RealGimm.Web.PriceListMeasurementUnit.fragment';
import { PriceListMeasurementUnitFormInput } from '../../interfaces/FormInputs/PriceListMeasurementUnit';

export const parsePriceListMeasurementUnitToPriceListMeasurementUnitFormInput = (
  priceListMeasurementUnit: PriceListMeasurementUnitFragment,
): PriceListMeasurementUnitFormInput => ({
  internalCode: priceListMeasurementUnit.internalCode,
  name: priceListMeasurementUnit.name,
  ordering: priceListMeasurementUnit.ordering,
  priceListMeasurementUnitId: priceListMeasurementUnit.id,
});
