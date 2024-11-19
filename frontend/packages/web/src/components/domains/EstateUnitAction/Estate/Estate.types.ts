import { TableState } from '@tanstack/react-table';
import { UseFormSetValue } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitActionEstateProps {
  cityName: string;
  keepTopIds: number | number[];
  onChange?: (initialState: Partial<TableState>) => void;
  setValue: UseFormSetValue<EstateUnitFormInput>;
}
