import { Dispatch, SetStateAction } from 'react';

import { PenaltyFormInput } from '../../../../interfaces/FormInputs/Penalty';
import { PenaltyFieldProps } from '../Field/Field.types';

export interface PenaltyFieldAccordionProps extends PenaltyFieldProps {
  contractInternalCode?: string;
  index: number;
  internalCodes?: string[];
  penalties?: PenaltyFormInput[];
  onDuplicate?: (penalty: PenaltyFormInput) => void;
  setCanUseInternalCodes?: Dispatch<SetStateAction<Record<string, boolean>>>;
}
