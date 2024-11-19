import { UsageTypeApplicability } from '../../enums/UsageTypeApplicability';

export interface UsageTypeFormInput {
  usageTypeId: number | null;
  internalCode: string;
  name: string;
  ordering: number;
  applicability: UsageTypeApplicability[];
}
