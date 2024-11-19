import { WorkerFormInput } from '../FormInputs/Worker';
import { UserFieldValue } from './User';

export interface WorkTeamFieldValue {
  description: string;
  id: number;
  leaderUser: UserFieldValue;
  workers: WorkerFormInput[];
}
