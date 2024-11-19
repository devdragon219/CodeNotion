import { WorkerFormInput } from '../../../interfaces/FormInputs/Worker';

export const getEmptyWorkerFormInput = (): WorkerFormInput => ({
  craft: null,
  firstName: '',
  lastName: '',
  qualificationLevel: null,
  since: null,
  until: null,
  workerId: null,
});
