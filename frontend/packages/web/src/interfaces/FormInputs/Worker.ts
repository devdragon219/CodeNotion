import { CraftFieldValue } from '../FieldValues/Craft';
import { QualificationLevelFieldValue } from '../FieldValues/QualificationLevel';

export interface WorkersFieldValues {
  workers: WorkerFormInput[];
}

export interface WorkerFormInput {
  craft: CraftFieldValue | null;
  firstName: string;
  lastName: string;
  qualificationLevel: QualificationLevelFieldValue | null;
  since: Date | null;
  until: Date | null;
  workerId: number | null;
}
