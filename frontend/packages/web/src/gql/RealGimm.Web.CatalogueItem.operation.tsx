// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueDocumentsCategoryOutputFragmentDoc } from './RealGimm.Web.CatalogueDocumentsCategoryOutput.fragment';
import { CatalogueItemDetailFragmentDoc, CatalogueItemFragmentDoc } from './RealGimm.Web.CatalogueItem.fragment';
import { CatalogueItemFieldFragmentDoc } from './RealGimm.Web.CatalogueItemField.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCatalogueItemsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueItemFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueItemSortInput> | Types.CatalogueItemSortInput>;
}>;

export type GetCatalogueItemsQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    listCatalogueItems?: {
      __typename?: 'ListCatalogueItemsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CatalogueItem';
        internalCode: string;
        status: Types.EstateStatus;
        activationDate: string;
        lastMaintenanceDate: string;
        decommissioningDate?: string | null;
        id: number;
        estate: {
          __typename?: 'Estate';
          id: number;
          internalCode: string;
          name?: string | null;
          type: Types.EstateType;
          externalCode?: string | null;
          surfaceAreaSqM?: number | null;
          ownership: Types.EstateOwnership;
          buildYear?: number | null;
          status: Types.EstateStatus;
          notes?: string | null;
          managementSubject:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
          addresses: Array<{
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          }>;
          estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
          floors: Array<{
            __typename?: 'Floor';
            id: number;
            name: string;
            position: number;
            templateReference: string;
          }>;
          mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
          usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
          managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
          stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
        };
        catalogueType: {
          __typename?: 'CatalogueType';
          id: number;
          internalCode: string;
          name: string;
          notes?: string | null;
          category: {
            __typename?: 'CatalogueCategory';
            name: string;
            internalCode: string;
            id: number;
            subCategories: Array<{
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            }>;
            catalogueTypes: Array<{
              __typename?: 'CatalogueType';
              id: number;
              internalCode: string;
              name: string;
              notes?: string | null;
              subCategory?: {
                __typename?: 'CatalogueSubCategory';
                name: string;
                internalCode: string;
                id: number;
              } | null;
              activities: Array<{
                __typename?: 'CatalogueTypeActivity';
                activityType: Types.CatalogueTypeActivityType;
                id: number;
                name: string;
                isMandatoryByLaw: boolean;
              }>;
              usageTypes: Array<{
                __typename?: 'EstateUsageType';
                id: number;
                name: string;
                internalCode: string;
                ordering: number;
                isForEstate: boolean;
                isForEstateUnit: boolean;
                isForEstateSubUnit: boolean;
                isForContracts: boolean;
              }>;
              fields?: Array<
                Array<{
                  __typename?: 'CatalogueTypeField';
                  name: string;
                  isMandatory: boolean;
                  type: Types.CustomFieldType;
                  validValues?: Array<string> | null;
                  id: string;
                }>
              > | null;
            }>;
          };
          subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
          activities: Array<{
            __typename?: 'CatalogueTypeActivity';
            activityType: Types.CatalogueTypeActivityType;
            id: number;
            name: string;
            isMandatoryByLaw: boolean;
          }>;
          usageTypes: Array<{
            __typename?: 'EstateUsageType';
            id: number;
            name: string;
            internalCode: string;
            ordering: number;
            isForEstate: boolean;
            isForEstateUnit: boolean;
            isForEstateSubUnit: boolean;
            isForContracts: boolean;
          }>;
          fields?: Array<
            Array<{
              __typename?: 'CatalogueTypeField';
              name: string;
              isMandatory: boolean;
              type: Types.CustomFieldType;
              validValues?: Array<string> | null;
              id: string;
            }>
          > | null;
        };
        fields: Array<{
          __typename?: 'CatalogueItemField';
          name: string;
          isMandatory: boolean;
          templateTypeId: string;
          type: Types.CustomFieldType;
          value?: string | null;
        }>;
      }> | null;
    } | null;
  };
};

export type GetCatalogueItemInternalCodeQueryVariables = Types.Exact<{
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type GetCatalogueItemInternalCodeQuery = {
  __typename?: 'Query';
  catalogueItem: { __typename?: 'CatalogueItemQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseCatalogueItemInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentCatalogueItemId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCatalogueItemInternalCodeQuery = {
  __typename?: 'Query';
  catalogueItem: { __typename?: 'CatalogueItemQueries'; canUseInternalCode: boolean };
};

export type GetCatalogueItemQueryVariables = Types.Exact<{
  catalogueItemId: Types.Scalars['Int']['input'];
}>;

export type GetCatalogueItemQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    get?: {
      __typename?: 'CatalogueItem';
      internalCode: string;
      status: Types.EstateStatus;
      activationDate: string;
      lastMaintenanceDate: string;
      decommissioningDate?: string | null;
      id: number;
      estate: {
        __typename?: 'Estate';
        id: number;
        internalCode: string;
        name?: string | null;
        type: Types.EstateType;
        externalCode?: string | null;
        surfaceAreaSqM?: number | null;
        ownership: Types.EstateOwnership;
        buildYear?: number | null;
        status: Types.EstateStatus;
        notes?: string | null;
        managementSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        addresses: Array<{
          __typename?: 'AsstAddress';
          id: number;
          addressType: Types.AsstAddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
          locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
        }>;
        estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
        floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
        mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
        usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
        managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
        stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
      };
      catalogueType: {
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        notes?: string | null;
        category: {
          __typename?: 'CatalogueCategory';
          name: string;
          internalCode: string;
          id: number;
          subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
          catalogueTypes: Array<{
            __typename?: 'CatalogueType';
            id: number;
            internalCode: string;
            name: string;
            notes?: string | null;
            subCategory?: {
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            } | null;
            activities: Array<{
              __typename?: 'CatalogueTypeActivity';
              activityType: Types.CatalogueTypeActivityType;
              id: number;
              name: string;
              isMandatoryByLaw: boolean;
            }>;
            usageTypes: Array<{
              __typename?: 'EstateUsageType';
              id: number;
              name: string;
              internalCode: string;
              ordering: number;
              isForEstate: boolean;
              isForEstateUnit: boolean;
              isForEstateSubUnit: boolean;
              isForContracts: boolean;
            }>;
            fields?: Array<
              Array<{
                __typename?: 'CatalogueTypeField';
                name: string;
                isMandatory: boolean;
                type: Types.CustomFieldType;
                validValues?: Array<string> | null;
                id: string;
              }>
            > | null;
          }>;
        };
        subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
        activities: Array<{
          __typename?: 'CatalogueTypeActivity';
          activityType: Types.CatalogueTypeActivityType;
          id: number;
          name: string;
          isMandatoryByLaw: boolean;
        }>;
        usageTypes: Array<{
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        }>;
        fields?: Array<
          Array<{
            __typename?: 'CatalogueTypeField';
            name: string;
            isMandatory: boolean;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
            id: string;
          }>
        > | null;
      };
      fields: Array<{
        __typename?: 'CatalogueItemField';
        name: string;
        isMandatory: boolean;
        templateTypeId: string;
        type: Types.CustomFieldType;
        value?: string | null;
      }>;
    } | null;
  };
};

export type ExportCatalogueItemsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueItemFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueItemSortInput> | Types.CatalogueItemSortInput>;
}>;

export type ExportCatalogueItemsQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type DeleteCatalogueItemMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueItemMutation = {
  __typename?: 'Mutation';
  catalogueItem: {
    __typename?: 'CatalogueItemMutations';
    delete: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type UpdateCatalogueItemMutationVariables = Types.Exact<{
  catalogueItemInput: Types.CatalogueItemInput;
}>;

export type UpdateCatalogueItemMutation = {
  __typename?: 'Mutation';
  catalogueItem: {
    __typename?: 'CatalogueItemMutations';
    update: {
      __typename?: 'ResultOfCatalogueItem';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type AddCatalogueItemDocumentsMutationVariables = Types.Exact<{
  catalogueItemId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddCatalogueItemDocumentsMutation = {
  __typename?: 'Mutation';
  catalogueItem: {
    __typename?: 'CatalogueItemMutations';
    document: {
      __typename?: 'CatalogueItemDocumentMutations';
      addRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type DeleteCatalogueItemDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteCatalogueItemDocumentsMutation = {
  __typename?: 'Mutation';
  catalogueItem: {
    __typename?: 'CatalogueItemMutations';
    document: {
      __typename?: 'CatalogueItemDocumentMutations';
      deleteRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type UpdateCatalogueItemDocumentMutationVariables = Types.Exact<{
  catalogueItemId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateCatalogueItemDocumentMutation = {
  __typename?: 'Mutation';
  catalogueItem: {
    __typename?: 'CatalogueItemMutations';
    document: {
      __typename?: 'CatalogueItemDocumentMutations';
      update: {
        __typename?: 'ResultOfDocument';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type GetCatalogueItemDocumentsQueryVariables = Types.Exact<{
  catalogueItemId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetCatalogueItemDocumentsQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    get?: {
      __typename?: 'CatalogueItem';
      documents: Array<{
        __typename?: 'DocumentsPerContentCategoryGroupOutput';
        contentCategoryGroup: string;
        guid: string;
        subRows: Array<{
          __typename?: 'DocumentsPerContentCategoryOutput';
          contentCategory: Types.ContentCategory;
          guid: string;
          subRows: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }>;
      }>;
    } | null;
  };
};

export type GetCatalogueItemsDocumentsQueryVariables = Types.Exact<{
  catalogueItemIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.CatalogueDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.CatalogueDocumentsCategoryOutputSortInput> | Types.CatalogueDocumentsCategoryOutputSortInput
  >;
}>;

export type GetCatalogueItemsDocumentsQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    documents: {
      __typename?: 'CatalogueItemDocumentQueries';
      listDocuments: Array<{
        __typename?: 'CatalogueDocumentsCategoryOutput';
        categoryName: string;
        guid: string;
        subRows: Array<{
          __typename?: 'CatalogueDocumentsSubCategoryOutput';
          subCategoryName?: string | null;
          guid: string;
          subRows: Array<{
            __typename?: 'CatalogueDocumentsTypeOutput';
            catalogueTypeName: string;
            guid: string;
            subRows: Array<{
              __typename?: 'CatalogueDocumentsPerContentCategoryGroupOutput';
              guid: string;
              contentCategoryGroup: string;
              subRows: Array<{
                __typename?: 'CatalogueDocumentsPerContentCategoryOutput';
                guid: string;
                contentCategory: Types.ContentCategory;
                subRows: Array<{
                  __typename?: 'CatalogueDocumentOutput';
                  catalogueItemInternalCode?: string | null;
                  estateId: number;
                  catalogueTypeId: number;
                  cmisId: string;
                  creationDate: string;
                  entityId?: string | null;
                  catalogueItemId?: number | null;
                  fileName?: string | null;
                  issueDate?: string | null;
                  issuer?: string | null;
                  name: string;
                  notes?: string | null;
                  protocolNumber?: string | null;
                  since?: string | null;
                  until?: string | null;
                  uploaderName?: string | null;
                }>;
              }>;
            }>;
          }>;
        }>;
      }>;
    };
  };
};

export type GetAllCatalogueItemsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueItemFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueItemSortInput> | Types.CatalogueItemSortInput>;
}>;

export type GetAllCatalogueItemsQuery = {
  __typename?: 'Query';
  catalogueItem: {
    __typename?: 'CatalogueItemQueries';
    listCatalogueItemsFull: Array<{
      __typename?: 'CatalogueItem';
      internalCode: string;
      id: number;
      estate: { __typename?: 'Estate'; id: number };
      catalogueType: {
        __typename?: 'CatalogueType';
        id: number;
        name: string;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      };
    }>;
  };
};

export const GetCatalogueItemsDocument = gql`
  query getCatalogueItems(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueItemFilterInput
    $order: [CatalogueItemSortInput!]
  ) {
    catalogueItem {
      listCatalogueItems(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CatalogueItemDetailFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueItemDetailFragmentDoc}
  ${EstateFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueItemFieldFragmentDoc}
`;

export function useGetCatalogueItemsQuery(options?: Omit<Urql.UseQueryArgs<GetCatalogueItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogueItemsQuery, GetCatalogueItemsQueryVariables>({
    query: GetCatalogueItemsDocument,
    ...options,
  });
}
export const GetCatalogueItemInternalCodeDocument = gql`
  query getCatalogueItemInternalCode($additionallyOccupiedCodes: [String!]!) {
    catalogueItem {
      proposeNewInternalCode(additionallyOccupiedCodes: $additionallyOccupiedCodes)
    }
  }
`;

export function useGetCatalogueItemInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueItemInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueItemInternalCodeQuery, GetCatalogueItemInternalCodeQueryVariables>({
    query: GetCatalogueItemInternalCodeDocument,
    ...options,
  });
}
export const CanUseCatalogueItemInternalCodeDocument = gql`
  query canUseCatalogueItemInternalCode($internalCode: String!, $currentCatalogueItemId: Int) {
    catalogueItem {
      canUseInternalCode(internalCode: $internalCode, currentCatalogueItemId: $currentCatalogueItemId)
    }
  }
`;

export function useCanUseCatalogueItemInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCatalogueItemInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseCatalogueItemInternalCodeQuery, CanUseCatalogueItemInternalCodeQueryVariables>({
    query: CanUseCatalogueItemInternalCodeDocument,
    ...options,
  });
}
export const GetCatalogueItemDocument = gql`
  query getCatalogueItem($catalogueItemId: Int!) {
    catalogueItem {
      get(id: $catalogueItemId) {
        ...CatalogueItemDetailFragment
      }
    }
  }
  ${CatalogueItemDetailFragmentDoc}
  ${EstateFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueItemFieldFragmentDoc}
`;

export function useGetCatalogueItemQuery(options: Omit<Urql.UseQueryArgs<GetCatalogueItemQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogueItemQuery, GetCatalogueItemQueryVariables>({
    query: GetCatalogueItemDocument,
    ...options,
  });
}
export const ExportCatalogueItemsDocument = gql`
  query exportCatalogueItems($where: CatalogueItemFilterInput, $order: [CatalogueItemSortInput!]) {
    catalogueItem {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCatalogueItemsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportCatalogueItemsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportCatalogueItemsQuery, ExportCatalogueItemsQueryVariables>({
    query: ExportCatalogueItemsDocument,
    ...options,
  });
}
export const DeleteCatalogueItemDocument = gql`
  mutation deleteCatalogueItem($id: Int!) {
    catalogueItem {
      delete(id: $id) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteCatalogueItemMutation() {
  return Urql.useMutation<DeleteCatalogueItemMutation, DeleteCatalogueItemMutationVariables>(
    DeleteCatalogueItemDocument,
  );
}
export const UpdateCatalogueItemDocument = gql`
  mutation updateCatalogueItem($catalogueItemInput: CatalogueItemInput!) {
    catalogueItem {
      update(input: $catalogueItemInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateCatalogueItemMutation() {
  return Urql.useMutation<UpdateCatalogueItemMutation, UpdateCatalogueItemMutationVariables>(
    UpdateCatalogueItemDocument,
  );
}
export const AddCatalogueItemDocumentsDocument = gql`
  mutation addCatalogueItemDocuments($catalogueItemId: Int!, $inputs: [DocumentInput!]!) {
    catalogueItem {
      document {
        addRange(catalogueItemId: $catalogueItemId, inputs: $inputs) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddCatalogueItemDocumentsMutation() {
  return Urql.useMutation<AddCatalogueItemDocumentsMutation, AddCatalogueItemDocumentsMutationVariables>(
    AddCatalogueItemDocumentsDocument,
  );
}
export const DeleteCatalogueItemDocumentsDocument = gql`
  mutation deleteCatalogueItemDocuments($entityId: Int!, $cmisIds: [String!]!) {
    catalogueItem {
      document {
        deleteRange(catalogueItemId: $entityId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteCatalogueItemDocumentsMutation() {
  return Urql.useMutation<DeleteCatalogueItemDocumentsMutation, DeleteCatalogueItemDocumentsMutationVariables>(
    DeleteCatalogueItemDocumentsDocument,
  );
}
export const UpdateCatalogueItemDocumentDocument = gql`
  mutation updateCatalogueItemDocument($catalogueItemId: Int!, $input: DocumentInput!) {
    catalogueItem {
      document {
        update(catalogueItemId: $catalogueItemId, input: $input) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateCatalogueItemDocumentMutation() {
  return Urql.useMutation<UpdateCatalogueItemDocumentMutation, UpdateCatalogueItemDocumentMutationVariables>(
    UpdateCatalogueItemDocumentDocument,
  );
}
export const GetCatalogueItemDocumentsDocument = gql`
  query getCatalogueItemDocuments(
    $catalogueItemId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    catalogueItem {
      get(id: $catalogueItemId) {
        documents(where: $where, order: $order) {
          ...DocumentsPerContentCategoryGroupOutputFragment
        }
      }
    }
  }
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetCatalogueItemDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueItemDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueItemDocumentsQuery, GetCatalogueItemDocumentsQueryVariables>({
    query: GetCatalogueItemDocumentsDocument,
    ...options,
  });
}
export const GetCatalogueItemsDocumentsDocument = gql`
  query getCatalogueItemsDocuments(
    $catalogueItemIds: [Int!]!
    $where: CatalogueDocumentsFlatOutputFilterInput
    $order: [CatalogueDocumentsCategoryOutputSortInput!]
  ) {
    catalogueItem {
      documents {
        listDocuments(catalogueItemIds: $catalogueItemIds, where: $where, order: $order) {
          ...CatalogueDocumentsCategoryOutputFragment
        }
      }
    }
  }
  ${CatalogueDocumentsCategoryOutputFragmentDoc}
`;

export function useGetCatalogueItemsDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueItemsDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueItemsDocumentsQuery, GetCatalogueItemsDocumentsQueryVariables>({
    query: GetCatalogueItemsDocumentsDocument,
    ...options,
  });
}
export const GetAllCatalogueItemsDocument = gql`
  query getAllCatalogueItems($where: CatalogueItemFilterInput, $order: [CatalogueItemSortInput!]) {
    catalogueItem {
      listCatalogueItemsFull(where: $where, order: $order) {
        ...CatalogueItemFragment
      }
    }
  }
  ${CatalogueItemFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
`;

export function useGetAllCatalogueItemsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllCatalogueItemsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllCatalogueItemsQuery, GetAllCatalogueItemsQueryVariables>({
    query: GetAllCatalogueItemsDocument,
    ...options,
  });
}
