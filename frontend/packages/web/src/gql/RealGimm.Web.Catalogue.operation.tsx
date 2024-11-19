// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueItemDetailFragmentDoc, CatalogueItemFragmentDoc } from './RealGimm.Web.CatalogueItem.fragment';
import { CatalogueItemFieldFragmentDoc } from './RealGimm.Web.CatalogueItemField.fragment';
import { CatalogueFragmentDoc } from './RealGimm.Web.CatalogueOutput.fragment';
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

export type GetCataloguesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueOutputSortInput> | Types.CatalogueOutputSortInput>;
}>;

export type GetCataloguesQuery = {
  __typename?: 'Query';
  catalogue: {
    __typename?: 'CatalogueQueries';
    listCatalogues?: {
      __typename?: 'ListCataloguesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CatalogueOutput';
        estateId: number;
        estateInternalCode?: string | null;
        catalogueCategory?: string | null;
        catalogueSubCategory?: string | null;
        catalogueType?: string | null;
        catalogueTypeCount: number;
        catalogueTypeId: number;
      }> | null;
    } | null;
  };
};

export type ExportCataloguesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueOutputSortInput> | Types.CatalogueOutputSortInput>;
}>;

export type ExportCataloguesQuery = {
  __typename?: 'Query';
  catalogue: { __typename?: 'CatalogueQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type DeleteCatalogueMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
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

export type DeleteCataloguesMutationVariables = Types.Exact<{
  ids: Array<Types.CatalogueIdInput> | Types.CatalogueIdInput;
}>;

export type DeleteCataloguesMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    deleteRange: {
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

export type CreateCataloguesMutationVariables = Types.Exact<{
  catalogueInputs: Array<Types.CatalogueItemInput> | Types.CatalogueItemInput;
}>;

export type CreateCataloguesMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    add: {
      __typename?: 'ResultOfCatalogueItem__';
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

export type GetCatalogueQueryVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
}>;

export type GetCatalogueQuery = {
  __typename?: 'Query';
  catalogue: {
    __typename?: 'CatalogueQueries';
    get: Array<{
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
    }>;
  };
};

export type UpdateCatalogueMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
  catalogueInputs: Array<Types.CatalogueItemInput> | Types.CatalogueItemInput;
}>;

export type UpdateCatalogueMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    update: {
      __typename?: 'ResultOfCatalogueItem__';
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

export type GetCatalogueDocumentsQueryVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetCatalogueDocumentsQuery = {
  __typename?: 'Query';
  catalogue: {
    __typename?: 'CatalogueQueries';
    documents: {
      __typename?: 'CatalogueDocumentQueries';
      listDocuments: Array<{
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
    };
  };
};

export type AddCatalogueDocumentsMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddCatalogueDocumentsMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    document: {
      __typename?: 'CatalogueDocumentMutations';
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

export type DeleteCatalogueDocumentsMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteCatalogueDocumentsMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    document: {
      __typename?: 'CatalogueDocumentMutations';
      deleteRange: {
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
};

export type UpdateCatalogueDocumentMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  estateId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateCatalogueDocumentMutation = {
  __typename?: 'Mutation';
  catalogue: {
    __typename?: 'CatalogueMutations';
    document: {
      __typename?: 'CatalogueDocumentMutations';
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

export const GetCataloguesDocument = gql`
  query getCatalogues(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueOutputFilterInput
    $order: [CatalogueOutputSortInput!]
  ) {
    catalogue {
      listCatalogues(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CatalogueFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueFragmentDoc}
`;

export function useGetCataloguesQuery(options?: Omit<Urql.UseQueryArgs<GetCataloguesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCataloguesQuery, GetCataloguesQueryVariables>({ query: GetCataloguesDocument, ...options });
}
export const ExportCataloguesDocument = gql`
  query exportCatalogues($where: CatalogueOutputFilterInput, $order: [CatalogueOutputSortInput!]) {
    catalogue {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCataloguesQuery(options?: Omit<Urql.UseQueryArgs<ExportCataloguesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportCataloguesQuery, ExportCataloguesQueryVariables>({
    query: ExportCataloguesDocument,
    ...options,
  });
}
export const DeleteCatalogueDocument = gql`
  mutation deleteCatalogue($catalogueTypeId: Int!, $estateId: Int!) {
    catalogue {
      delete(id: { estateId: $estateId, catalogueTypeId: $catalogueTypeId }) {
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

export function useDeleteCatalogueMutation() {
  return Urql.useMutation<DeleteCatalogueMutation, DeleteCatalogueMutationVariables>(DeleteCatalogueDocument);
}
export const DeleteCataloguesDocument = gql`
  mutation deleteCatalogues($ids: [CatalogueIdInput!]!) {
    catalogue {
      deleteRange(ids: $ids) {
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

export function useDeleteCataloguesMutation() {
  return Urql.useMutation<DeleteCataloguesMutation, DeleteCataloguesMutationVariables>(DeleteCataloguesDocument);
}
export const CreateCataloguesDocument = gql`
  mutation createCatalogues($catalogueInputs: [CatalogueItemInput!]!) {
    catalogue {
      add(inputs: $catalogueInputs) {
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

export function useCreateCataloguesMutation() {
  return Urql.useMutation<CreateCataloguesMutation, CreateCataloguesMutationVariables>(CreateCataloguesDocument);
}
export const GetCatalogueDocument = gql`
  query getCatalogue($catalogueTypeId: Int!, $estateId: Int!) {
    catalogue {
      get(estateId: $estateId, catalogueTypeId: $catalogueTypeId) {
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

export function useGetCatalogueQuery(options: Omit<Urql.UseQueryArgs<GetCatalogueQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogueQuery, GetCatalogueQueryVariables>({ query: GetCatalogueDocument, ...options });
}
export const UpdateCatalogueDocument = gql`
  mutation updateCatalogue($catalogueTypeId: Int!, $estateId: Int!, $catalogueInputs: [CatalogueItemInput!]!) {
    catalogue {
      update(id: { estateId: $estateId, catalogueTypeId: $catalogueTypeId }, inputs: $catalogueInputs) {
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

export function useUpdateCatalogueMutation() {
  return Urql.useMutation<UpdateCatalogueMutation, UpdateCatalogueMutationVariables>(UpdateCatalogueDocument);
}
export const GetCatalogueDocumentsDocument = gql`
  query getCatalogueDocuments(
    $catalogueTypeId: Int!
    $estateId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    catalogue {
      documents {
        listDocuments(catalogueTypeId: $catalogueTypeId, estateId: $estateId, where: $where, order: $order) {
          ...DocumentsPerContentCategoryGroupOutputFragment
        }
      }
    }
  }
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetCatalogueDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueDocumentsQuery, GetCatalogueDocumentsQueryVariables>({
    query: GetCatalogueDocumentsDocument,
    ...options,
  });
}
export const AddCatalogueDocumentsDocument = gql`
  mutation addCatalogueDocuments($catalogueTypeId: Int!, $estateId: Int!, $inputs: [DocumentInput!]!) {
    catalogue {
      document {
        addRange(catalogueTypeId: $catalogueTypeId, estateId: $estateId, inputs: $inputs) {
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

export function useAddCatalogueDocumentsMutation() {
  return Urql.useMutation<AddCatalogueDocumentsMutation, AddCatalogueDocumentsMutationVariables>(
    AddCatalogueDocumentsDocument,
  );
}
export const DeleteCatalogueDocumentsDocument = gql`
  mutation deleteCatalogueDocuments($catalogueTypeId: Int!, $estateId: Int!, $cmisIds: [String!]!) {
    catalogue {
      document {
        deleteRange(catalogueTypeId: $catalogueTypeId, estateId: $estateId, cmisIds: $cmisIds) {
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

export function useDeleteCatalogueDocumentsMutation() {
  return Urql.useMutation<DeleteCatalogueDocumentsMutation, DeleteCatalogueDocumentsMutationVariables>(
    DeleteCatalogueDocumentsDocument,
  );
}
export const UpdateCatalogueDocumentDocument = gql`
  mutation updateCatalogueDocument($catalogueTypeId: Int!, $estateId: Int!, $input: DocumentInput!) {
    catalogue {
      document {
        update(catalogueTypeId: $catalogueTypeId, estateId: $estateId, input: $input) {
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

export function useUpdateCatalogueDocumentMutation() {
  return Urql.useMutation<UpdateCatalogueDocumentMutation, UpdateCatalogueDocumentMutationVariables>(
    UpdateCatalogueDocumentDocument,
  );
}
