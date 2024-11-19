// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import {
  RegistrationPaymentDetailFragmentDoc,
  RegistrationPaymentFragmentDoc,
} from './RealGimm.Web.RegistrationPayment.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetRegistrationPaymentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RegistrationPaymentFilterInput>;
  order?: Types.InputMaybe<Array<Types.RegistrationPaymentSortInput> | Types.RegistrationPaymentSortInput>;
}>;

export type GetRegistrationPaymentsQuery = {
  __typename?: 'Query';
  registrationPayment: {
    __typename?: 'RegistrationPaymentQueries';
    listRegistrationPayments?: {
      __typename?: 'ListRegistrationPaymentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RegistrationPayment';
        paymentType: Types.RegistrationPaymentType;
        paymentYear: number;
        paymentCode: string;
        valueDate: string;
        id: number;
        contract: {
          __typename?: 'Contract';
          id: number;
          internalCode: string;
          managementSubject:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
          locatedUnits: Array<{
            __typename?: 'LocatedUnit';
            id: number;
            isMainUnit: boolean;
            estateUnit: {
              __typename?: 'EstateUnit';
              id: number;
              estate: {
                __typename?: 'Estate';
                id: number;
                internalCode: string;
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
              };
            };
          }>;
        };
      }> | null;
    } | null;
  };
};

export type GetRegistrationPaymentQueryVariables = Types.Exact<{
  registrationPaymentId: Types.Scalars['Int']['input'];
}>;

export type GetRegistrationPaymentQuery = {
  __typename?: 'Query';
  registrationPayment: {
    __typename?: 'RegistrationPaymentQueries';
    get?: {
      __typename?: 'RegistrationPayment';
      paymentType: Types.RegistrationPaymentType;
      paymentYear: number;
      paymentCode: string;
      valueDate: string;
      sanctionAmount: number;
      taxAmount: number;
      id: number;
      contract: {
        __typename?: 'Contract';
        id: number;
        internalCode: string;
        managementSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
      };
      rows: Array<{
        __typename?: 'RegistrationPaymentRow';
        amountCleared?: number | null;
        amountDue: number;
        paymentRowCode: string;
        paymentRowReceivingEntity?: string | null;
        paymentRowSection?: string | null;
        referencePeriod?: number | null;
        referenceYear: number;
        id: number;
      }>;
    } | null;
  };
};

export type DeleteRegistrationPaymentsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteRegistrationPaymentsMutation = {
  __typename?: 'Mutation';
  registrationPayment: {
    __typename?: 'RegistrationPaymentMutations';
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

export type DeleteRegistrationPaymentMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteRegistrationPaymentMutation = {
  __typename?: 'Mutation';
  registrationPayment: {
    __typename?: 'RegistrationPaymentMutations';
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

export type CreateRegistrationPaymentMutationVariables = Types.Exact<{
  registrationPaymentInput: Types.RegistrationPaymentInput;
}>;

export type CreateRegistrationPaymentMutation = {
  __typename?: 'Mutation';
  registrationPayment: {
    __typename?: 'RegistrationPaymentMutations';
    add: {
      __typename?: 'ResultOfRegistrationPayment';
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

export type UpdateRegistrationPaymentMutationVariables = Types.Exact<{
  registrationPaymentId: Types.Scalars['Int']['input'];
  registrationPaymentInput: Types.RegistrationPaymentInput;
}>;

export type UpdateRegistrationPaymentMutation = {
  __typename?: 'Mutation';
  registrationPayment: {
    __typename?: 'RegistrationPaymentMutations';
    update: {
      __typename?: 'ResultOfRegistrationPayment';
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

export type ExportRegistrationPaymentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RegistrationPaymentFilterInput>;
  order?: Types.InputMaybe<Array<Types.RegistrationPaymentSortInput> | Types.RegistrationPaymentSortInput>;
}>;

export type ExportRegistrationPaymentsQuery = {
  __typename?: 'Query';
  registrationPayment: {
    __typename?: 'RegistrationPaymentQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetRegistrationPaymentsDocument = gql`
  query getRegistrationPayments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RegistrationPaymentFilterInput
    $order: [RegistrationPaymentSortInput!]
  ) {
    registrationPayment {
      listRegistrationPayments(
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
          ...RegistrationPaymentFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RegistrationPaymentFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetRegistrationPaymentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetRegistrationPaymentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistrationPaymentsQuery, GetRegistrationPaymentsQueryVariables>({
    query: GetRegistrationPaymentsDocument,
    ...options,
  });
}
export const GetRegistrationPaymentDocument = gql`
  query getRegistrationPayment($registrationPaymentId: Int!) {
    registrationPayment {
      get(id: $registrationPaymentId) {
        ...RegistrationPaymentDetailFragment
      }
    }
  }
  ${RegistrationPaymentDetailFragmentDoc}
`;

export function useGetRegistrationPaymentQuery(
  options: Omit<Urql.UseQueryArgs<GetRegistrationPaymentQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistrationPaymentQuery, GetRegistrationPaymentQueryVariables>({
    query: GetRegistrationPaymentDocument,
    ...options,
  });
}
export const DeleteRegistrationPaymentsDocument = gql`
  mutation deleteRegistrationPayments($ids: [Int!]!) {
    registrationPayment {
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

export function useDeleteRegistrationPaymentsMutation() {
  return Urql.useMutation<DeleteRegistrationPaymentsMutation, DeleteRegistrationPaymentsMutationVariables>(
    DeleteRegistrationPaymentsDocument,
  );
}
export const DeleteRegistrationPaymentDocument = gql`
  mutation deleteRegistrationPayment($id: Int!) {
    registrationPayment {
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

export function useDeleteRegistrationPaymentMutation() {
  return Urql.useMutation<DeleteRegistrationPaymentMutation, DeleteRegistrationPaymentMutationVariables>(
    DeleteRegistrationPaymentDocument,
  );
}
export const CreateRegistrationPaymentDocument = gql`
  mutation createRegistrationPayment($registrationPaymentInput: RegistrationPaymentInput!) {
    registrationPayment {
      add(input: $registrationPaymentInput) {
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

export function useCreateRegistrationPaymentMutation() {
  return Urql.useMutation<CreateRegistrationPaymentMutation, CreateRegistrationPaymentMutationVariables>(
    CreateRegistrationPaymentDocument,
  );
}
export const UpdateRegistrationPaymentDocument = gql`
  mutation updateRegistrationPayment(
    $registrationPaymentId: Int!
    $registrationPaymentInput: RegistrationPaymentInput!
  ) {
    registrationPayment {
      update(id: $registrationPaymentId, input: $registrationPaymentInput) {
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

export function useUpdateRegistrationPaymentMutation() {
  return Urql.useMutation<UpdateRegistrationPaymentMutation, UpdateRegistrationPaymentMutationVariables>(
    UpdateRegistrationPaymentDocument,
  );
}
export const ExportRegistrationPaymentsDocument = gql`
  query exportRegistrationPayments($where: RegistrationPaymentFilterInput, $order: [RegistrationPaymentSortInput!]) {
    registrationPayment {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportRegistrationPaymentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportRegistrationPaymentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportRegistrationPaymentsQuery, ExportRegistrationPaymentsQueryVariables>({
    query: ExportRegistrationPaymentsDocument,
    ...options,
  });
}
