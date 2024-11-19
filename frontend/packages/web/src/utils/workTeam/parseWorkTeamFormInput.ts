import { WorkTeamInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { WorkTeamFormInput } from '../../interfaces/FormInputs/WorkTeam';
import { parseWorkerFormInputToWorkerInput } from '../components/worker/parseWorkerFormInput';

export const parseWorkTeamFormInputToWorkTeamInput = (workTeam: WorkTeamFormInput): WorkTeamInput => ({
  description: workTeam.description,
  insertionDate: parseDateToString(workTeam.insertionDate)!,
  internalCode: workTeam.internalCode,
  leaderUserId: workTeam.leaderUser!.id,
  providerSubjectId: workTeam.providerSubject!.id,
  workers: workTeam.workers.map(parseWorkerFormInputToWorkerInput),
});
