// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { InterventionTypeFragmentDoc } from './RealGimm.Web.InterventionType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import {
  TicketChecklistTemplateDetailFragmentDoc,
  TicketChecklistTemplateFragmentDoc,
} from './RealGimm.Web.TicketChecklistTemplate.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetTicketChecklistTemplatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketChecklistTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistTemplateSortInput> | Types.TicketChecklistTemplateSortInput>;
}>;

export type GetTicketChecklistTemplatesQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateQueries';
    listTicketChecklistTemplates?: {
      __typename?: 'ListTicketChecklistTemplatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketChecklistTemplate';
        internalCode: string;
        name: string;
        type: Types.TicketChecklistTemplateType;
        costBaseFactor: Types.CostBaseFactor;
        rawWorkCost: number;
        safetyCost: number;
        id: number;
        catalogueType: {
          __typename?: 'CatalogueType';
          id: number;
          category: { __typename?: 'CatalogueCategory'; id: number; name: string };
          subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        };
      }> | null;
    } | null;
  };
};

export type AddTicketChecklistTemplateMutationVariables = Types.Exact<{
  input: Types.TicketChecklistTemplateInput;
}>;

export type AddTicketChecklistTemplateMutation = {
  __typename?: 'Mutation';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateMutations';
    add: {
      __typename?: 'ResultOfTicketChecklistTemplate';
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

export type UpdateTicketChecklistTemplateMutationVariables = Types.Exact<{
  ticketChecklistTemplateId: Types.Scalars['Int']['input'];
  input: Types.TicketChecklistTemplateInput;
}>;

export type UpdateTicketChecklistTemplateMutation = {
  __typename?: 'Mutation';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateMutations';
    update: {
      __typename?: 'ResultOfTicketChecklistTemplate';
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

export type DeleteTicketChecklistTemplatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTicketChecklistTemplatesMutation = {
  __typename?: 'Mutation';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateMutations';
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

export type GetTicketChecklistTemplateInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetTicketChecklistTemplateInternalCodeQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: { __typename?: 'TicketChecklistTemplateQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseTicketChecklistTemplateInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentTicketChecklistTemplateId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseTicketChecklistTemplateInternalCodeQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: { __typename?: 'TicketChecklistTemplateQueries'; canUseInternalCode: boolean };
};

export type ExportTicketChecklistTemplatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketChecklistTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistTemplateSortInput> | Types.TicketChecklistTemplateSortInput>;
}>;

export type ExportTicketChecklistTemplatesQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetTicketChecklistTemplateQueryVariables = Types.Exact<{
  ticketChecklistTemplateId: Types.Scalars['Int']['input'];
}>;

export type GetTicketChecklistTemplateQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateQueries';
    get?: {
      __typename?: 'TicketChecklistTemplate';
      internalCode: string;
      name: string;
      type: Types.TicketChecklistTemplateType;
      costBaseFactor: Types.CostBaseFactor;
      rawWorkCost: number;
      safetyCost: number;
      preventativePlannedPeriod?: Types.PlannedPeriod | null;
      preventativeDaysOfWeek?: Array<Types.DayOfWeek> | null;
      preventativeToleranceDays?: number | null;
      id: number;
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
      preventativeActivities?: Array<{
        __typename?: 'CatalogueTypeActivity';
        activityType: Types.CatalogueTypeActivityType;
        id: number;
        name: string;
        isMandatoryByLaw: boolean;
      }> | null;
      preventativeInterventionType?: {
        __typename?: 'InterventionType';
        internalCode: string;
        name: string;
        id: number;
      } | null;
      preventativeCraft?: {
        __typename?: 'Craft';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      } | null;
      onTriggerActivities?: Array<{
        __typename?: 'CatalogueTypeActivity';
        activityType: Types.CatalogueTypeActivityType;
        id: number;
        name: string;
        isMandatoryByLaw: boolean;
      }> | null;
      onTriggerInterventionType?: {
        __typename?: 'InterventionType';
        internalCode: string;
        name: string;
        id: number;
      } | null;
      onTriggerCraft?: {
        __typename?: 'Craft';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      } | null;
    } | null;
  };
};

export type DeleteTicketChecklistTemplateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteTicketChecklistTemplateMutation = {
  __typename?: 'Mutation';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateMutations';
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

export type GetAllTicketChecklistTemplatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketChecklistTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistTemplateSortInput> | Types.TicketChecklistTemplateSortInput>;
}>;

export type GetAllTicketChecklistTemplatesQuery = {
  __typename?: 'Query';
  ticketChecklistTemplate: {
    __typename?: 'TicketChecklistTemplateQueries';
    listTicketChecklistTemplatesFull: Array<{
      __typename?: 'TicketChecklistTemplate';
      internalCode: string;
      name: string;
      type: Types.TicketChecklistTemplateType;
      costBaseFactor: Types.CostBaseFactor;
      rawWorkCost: number;
      safetyCost: number;
      id: number;
      catalogueType: {
        __typename?: 'CatalogueType';
        id: number;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      };
    }>;
  };
};

export const GetTicketChecklistTemplatesDocument = gql`
  query getTicketChecklistTemplates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketChecklistTemplateFilterInput
    $order: [TicketChecklistTemplateSortInput!]
  ) {
    ticketChecklistTemplate {
      listTicketChecklistTemplates(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketChecklistTemplateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketChecklistTemplateFragmentDoc}
`;

export function useGetTicketChecklistTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketChecklistTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketChecklistTemplatesQuery, GetTicketChecklistTemplatesQueryVariables>({
    query: GetTicketChecklistTemplatesDocument,
    ...options,
  });
}
export const AddTicketChecklistTemplateDocument = gql`
  mutation addTicketChecklistTemplate($input: TicketChecklistTemplateInput!) {
    ticketChecklistTemplate {
      add(input: $input) {
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

export function useAddTicketChecklistTemplateMutation() {
  return Urql.useMutation<AddTicketChecklistTemplateMutation, AddTicketChecklistTemplateMutationVariables>(
    AddTicketChecklistTemplateDocument,
  );
}
export const UpdateTicketChecklistTemplateDocument = gql`
  mutation updateTicketChecklistTemplate($ticketChecklistTemplateId: Int!, $input: TicketChecklistTemplateInput!) {
    ticketChecklistTemplate {
      update(id: $ticketChecklistTemplateId, input: $input) {
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

export function useUpdateTicketChecklistTemplateMutation() {
  return Urql.useMutation<UpdateTicketChecklistTemplateMutation, UpdateTicketChecklistTemplateMutationVariables>(
    UpdateTicketChecklistTemplateDocument,
  );
}
export const DeleteTicketChecklistTemplatesDocument = gql`
  mutation deleteTicketChecklistTemplates($ids: [Int!]!) {
    ticketChecklistTemplate {
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

export function useDeleteTicketChecklistTemplatesMutation() {
  return Urql.useMutation<DeleteTicketChecklistTemplatesMutation, DeleteTicketChecklistTemplatesMutationVariables>(
    DeleteTicketChecklistTemplatesDocument,
  );
}
export const GetTicketChecklistTemplateInternalCodeDocument = gql`
  query getTicketChecklistTemplateInternalCode {
    ticketChecklistTemplate {
      proposeNewInternalCode
    }
  }
`;

export function useGetTicketChecklistTemplateInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketChecklistTemplateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetTicketChecklistTemplateInternalCodeQuery,
    GetTicketChecklistTemplateInternalCodeQueryVariables
  >({ query: GetTicketChecklistTemplateInternalCodeDocument, ...options });
}
export const CanUseTicketChecklistTemplateInternalCodeDocument = gql`
  query canUseTicketChecklistTemplateInternalCode($internalCode: String!, $currentTicketChecklistTemplateId: Int) {
    ticketChecklistTemplate {
      canUseInternalCode(
        internalCode: $internalCode
        currentTicketChecklistTemplateId: $currentTicketChecklistTemplateId
      )
    }
  }
`;

export function useCanUseTicketChecklistTemplateInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseTicketChecklistTemplateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUseTicketChecklistTemplateInternalCodeQuery,
    CanUseTicketChecklistTemplateInternalCodeQueryVariables
  >({ query: CanUseTicketChecklistTemplateInternalCodeDocument, ...options });
}
export const ExportTicketChecklistTemplatesDocument = gql`
  query exportTicketChecklistTemplates(
    $where: TicketChecklistTemplateFilterInput
    $order: [TicketChecklistTemplateSortInput!]
  ) {
    ticketChecklistTemplate {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTicketChecklistTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportTicketChecklistTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportTicketChecklistTemplatesQuery, ExportTicketChecklistTemplatesQueryVariables>({
    query: ExportTicketChecklistTemplatesDocument,
    ...options,
  });
}
export const GetTicketChecklistTemplateDocument = gql`
  query getTicketChecklistTemplate($ticketChecklistTemplateId: Int!) {
    ticketChecklistTemplate {
      get(id: $ticketChecklistTemplateId) {
        ...TicketChecklistTemplateDetailFragment
      }
    }
  }
  ${TicketChecklistTemplateDetailFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${InterventionTypeFragmentDoc}
  ${CraftFragmentDoc}
`;

export function useGetTicketChecklistTemplateQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketChecklistTemplateQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketChecklistTemplateQuery, GetTicketChecklistTemplateQueryVariables>({
    query: GetTicketChecklistTemplateDocument,
    ...options,
  });
}
export const DeleteTicketChecklistTemplateDocument = gql`
  mutation deleteTicketChecklistTemplate($id: Int!) {
    ticketChecklistTemplate {
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

export function useDeleteTicketChecklistTemplateMutation() {
  return Urql.useMutation<DeleteTicketChecklistTemplateMutation, DeleteTicketChecklistTemplateMutationVariables>(
    DeleteTicketChecklistTemplateDocument,
  );
}
export const GetAllTicketChecklistTemplatesDocument = gql`
  query getAllTicketChecklistTemplates(
    $where: TicketChecklistTemplateFilterInput
    $order: [TicketChecklistTemplateSortInput!]
  ) {
    ticketChecklistTemplate {
      listTicketChecklistTemplatesFull(where: $where, order: $order) {
        ...TicketChecklistTemplateFragment
      }
    }
  }
  ${TicketChecklistTemplateFragmentDoc}
`;

export function useGetAllTicketChecklistTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllTicketChecklistTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllTicketChecklistTemplatesQuery, GetAllTicketChecklistTemplatesQueryVariables>({
    query: GetAllTicketChecklistTemplatesDocument,
    ...options,
  });
}
