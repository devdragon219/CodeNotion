import { Control } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitHistoryProps {
  control: Control<CadastralUnitFormInput>;
  readonly?: boolean;
}
