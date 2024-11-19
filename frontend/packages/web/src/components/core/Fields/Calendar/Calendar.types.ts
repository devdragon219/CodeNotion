import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { CalendarFieldValue } from '../../../../interfaces/FieldValues/Calendar';

export type CalendarFieldProps = Omit<AutocompleteFieldProps<CalendarFieldValue>, SpecializedAutocompleteOmits>;
