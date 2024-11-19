import { WorkTeamFormInput } from '../../interfaces/FormInputs/WorkTeam';

export const getEmptyWorkTeamFormInput = (): WorkTeamFormInput => ({
  description: '',
  insertionDate: null,
  internalCode: '',
  leaderUser: null,
  providerSubject: null,
  workers: [],
  workTeamId: null,
});
