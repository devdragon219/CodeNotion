import { SubjectFieldValue } from '../FieldValues/Subject';
import { UserFieldValue } from '../FieldValues/User';
import { WorkerFormInput } from './Worker';

export interface WorkTeamFormInput {
  description: string;
  insertionDate: Date | null;
  internalCode: string;
  leaderUser: UserFieldValue | null;
  providerSubject: SubjectFieldValue | null;
  workers: WorkerFormInput[];
  workTeamId: number | null;
}
