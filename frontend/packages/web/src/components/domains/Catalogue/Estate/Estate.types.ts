import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueEstateProps {
  control: Control<CatalogueFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
