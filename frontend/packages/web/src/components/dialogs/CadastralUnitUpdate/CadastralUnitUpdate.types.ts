import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitUpdateConfirmationDialogProps {
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  isVariation: boolean;
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onSave: () => void;
}
