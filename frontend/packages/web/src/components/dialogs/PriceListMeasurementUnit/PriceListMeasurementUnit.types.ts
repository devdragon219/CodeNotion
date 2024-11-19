import { PriceListMeasurementUnitFormInput } from '../../../interfaces/FormInputs/PriceListMeasurementUnit';

export interface PriceListMeasurementUnitDialogProps {
  input?: PriceListMeasurementUnitFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: PriceListMeasurementUnitFormInput) => void;
}
