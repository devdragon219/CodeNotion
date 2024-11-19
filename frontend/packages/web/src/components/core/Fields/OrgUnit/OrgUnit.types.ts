import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { EntryStatus, OrgUnitType } from '@realgimm5/frontend-common/gql/types';

import { OrgUnitFieldValue } from '../../../../interfaces/FieldValues/OrgUnit';

export interface OrgUnitFieldProps
  extends Omit<AutocompleteFieldProps<OrgUnitFieldValue>, SpecializedAutocompleteOmits> {
  orgUnitIdToExclude?: number | null;
  parentSubjectId?: number;
  orgUnitType?: OrgUnitType;
  entryStatus?: EntryStatus;
}
