import { Dispatch, SetStateAction } from 'react';

import { SlaFormInput } from '../../../../interfaces/FormInputs/SLA';
import { SlaFieldProps } from '../Field/Field.types';

export interface SlaFieldAccordionProps extends SlaFieldProps {
  contractInternalCode?: string;
  index: number;
  internalCodes?: string[];
  slas?: SlaFormInput[];
  onDuplicate?: (sla: SlaFormInput) => void;
  setCanUseInternalCodes?: Dispatch<SetStateAction<Record<string, boolean>>>;
}
