import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { WorkerFragment } from '../../../gql/RealGimm.Web.Worker.fragment';
import { WorkerFormInput } from '../../../interfaces/FormInputs/Worker';

export const parseWorkerToWorkerFormInput = (worker: WorkerFragment): WorkerFormInput => ({
  craft: worker.craft,
  firstName: worker.firstName,
  lastName: worker.lastName,
  qualificationLevel: worker.qualificationLevel,
  since: parseStringToDate(worker.since),
  until: parseStringToDate(worker.until),
  workerId: worker.id,
});
