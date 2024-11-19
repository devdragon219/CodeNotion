import { CatalogueItemInput } from '@realgimm5/frontend-common/gql/types';

import { CatalogueFormInput } from '../../interfaces/FormInputs/Catalogue';
import { parseCatalogueItemFormInputToCatalogueItemInput } from '../catalogueItem/parseCatalogueItemFormInput';

export const parseCatalogueFormInputToCatalogueInput = (catalogue: CatalogueFormInput): CatalogueItemInput[] =>
  catalogue.items.map((item) =>
    parseCatalogueItemFormInputToCatalogueItemInput(
      item,
      catalogue.catalogueType!.catalogueTypeId!,
      catalogue.estate!.id,
    ),
  );
