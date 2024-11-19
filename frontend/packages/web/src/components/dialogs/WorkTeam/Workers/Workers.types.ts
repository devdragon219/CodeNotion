import { WorkerFragment } from '../../../../gql/RealGimm.Web.Worker.fragment';

export interface WorkTeamWorkersDialogProps {
  workers: WorkerFragment[];
  onClose: () => void;
}
