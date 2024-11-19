import { EstateAssetValueFormInput } from '../../../../../../interfaces/FormInputs/Estate';

export interface AssetValuesDialogInput {
  assetValue: EstateAssetValueFormInput;
  index: number;
}

export interface AssetValuesDialogProps {
  input?: AssetValuesDialogInput;
  onClose: () => void;
  onSave: (value: EstateAssetValueFormInput[] | AssetValuesDialogInput) => void;
}
