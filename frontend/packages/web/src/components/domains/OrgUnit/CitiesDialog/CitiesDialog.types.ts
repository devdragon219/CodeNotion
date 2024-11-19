import { CityFragment } from '../../../../gql/RealGimm.Web.City.fragment';

export interface OrgUnitCitiesDialogProps {
  input: CityFragment[];
  onClose: () => void;
  onSave: (value: CityFragment[]) => void;
}
