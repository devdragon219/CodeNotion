import { FloorTemplateFormInput } from '../../../interfaces/FormInputs/Floor';

export interface FloorTemplateDialogInput {
  floorTemplate: FloorTemplateFormInput;
  index: number;
}

export interface FloorTemplateDialogProps {
  input?: FloorTemplateDialogInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: FloorTemplateFormInput[] | FloorTemplateDialogInput) => void;
}
