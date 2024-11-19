import { CatalogueTypeActivityType } from '@realgimm5/frontend-common/gql/types';
import { FormBuilderRowFormInput } from '@realgimm5/frontend-common/interfaces';

import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { UsageTypeFieldValue } from '../FieldValues/UsageType';
import { CatalogueCategoryFormInput, CatalogueSubCategoryFormInput } from './CatalogueCategory';

export interface CatalogueTypeActivityFormInput {
  activityId: number | null;
  activityType: CatalogueTypeActivityType | null;
  isMandatoryByLaw: boolean;
  name: string;
}

export type CatalogueTypeCatalogueCategoryFormInput = Omit<CatalogueCategoryFormInput, 'catalogueTypes'>;

export interface CatalogueTypeFormInput {
  activities: CatalogueTypeActivityFormInput[];
  catalogueTypeId: number | null;
  category: CatalogueTypeCatalogueCategoryFormInput | null;
  fields: FormBuilderRowFormInput[];
  internalCode: string;
  name: string;
  notes: string;
  subCategory: CatalogueSubCategoryFormInput | null;
  usageTypes: UsageTypeFieldValue[];
}

export interface CatalogueTypeRow extends Omit<FacilityCatalogueTypeFragment, 'id'> {
  id: string | number;
  subRows?: CatalogueTypeRow[];
}
