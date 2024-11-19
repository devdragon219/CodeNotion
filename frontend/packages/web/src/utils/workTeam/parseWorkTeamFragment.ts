import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { WorkTeamFragment } from '../../gql/RealGimm.Web.WorkTeam.fragment';
import { WorkTeamFormInput } from '../../interfaces/FormInputs/WorkTeam';
import { parseWorkerToWorkerFormInput } from '../components/worker/parseWorkerFragment';
import { parseUserToUserFieldValue } from '../user/parseUserFragment';

export const parseWorkTeamToWorkTeamFormInput = (workTeam: WorkTeamFragment): WorkTeamFormInput => ({
  description: workTeam.description,
  insertionDate: parseStringToDate(workTeam.insertionDate),
  internalCode: workTeam.internalCode,
  leaderUser: parseUserToUserFieldValue(workTeam.leaderUser),
  providerSubject: workTeam.providerSubject,
  workers: workTeam.workers.map(parseWorkerToWorkerFormInput),
  workTeamId: workTeam.id,
});
