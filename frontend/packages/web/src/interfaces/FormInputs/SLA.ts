import { ConditionsBuilderFormInput } from './ConditionsBuilder';

export interface SlaFormInput {
  conditions: ConditionsBuilderFormInput;
  description: string;
  guid: string;
  internalCode: string;
  slaId: number | null;
}

export interface SlasFieldValues {
  slas: SlaFormInput[];
}
