import { WorkerInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { WorkerFormInput } from '../../../interfaces/FormInputs/Worker';

export const parseWorkerFormInputToWorkerInput = (worker: WorkerFormInput): WorkerInput => ({
  craftId: worker.craft!.id,
  firstName: worker.firstName,
  id: worker.workerId,
  lastName: worker.lastName,
  qualificationLevelId: worker.qualificationLevel!.id,
  since: parseDateToString(worker.since)!,
  until: parseDateToString(worker.until),
});
