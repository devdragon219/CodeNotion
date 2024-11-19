import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { TicketTypeFieldValue } from '../../../../interfaces/FieldValues/TicketType';

export type TicketTypeFieldProps = Omit<AutocompleteFieldProps<TicketTypeFieldValue>, SpecializedAutocompleteOmits>;
