import { MeteringType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { FormBuilderRowFormInput } from '@realgimm5/frontend-common/interfaces';

export interface UtilityTypeFormInput {
  category: UtilityCategory | null;
  description: string;
  expenseClass: string;
  externalCode: string;
  fields: FormBuilderRowFormInput[];
  hasHeatingAccountingSystem: boolean;
  internalCode: string;
  measurementUnit: string;
  measurementUnitDescription: string;
  meteringType: MeteringType | null;
  timeOfUseRateCount: number | null;
  utilityTypeId: number | null;
}
