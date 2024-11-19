import { Control } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueActivitiesProps {
  control: Control<CatalogueFormInput>;
  readonly?: boolean;
}
