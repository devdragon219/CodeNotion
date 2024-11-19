// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { OrgUnitFragmentDoc } from './RealGimm.Web.OrgUnit.fragment';
import { OrgUnitTreeNodeFragmentDoc } from './RealGimm.Web.OrgUnitTreeNode.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetOrgUnitsTreeQueryVariables = Types.Exact<{
  orgUnitType: Types.OrgUnitType;
}>;

export type GetOrgUnitsTreeQuery = {
  __typename?: 'Query';
  orgUnit: {
    __typename?: 'OrgUnitQueries';
    listOrgUnitsTree: Array<{
      __typename?: 'OrgUnitTreeNode';
      id: number;
      name?: string | null;
      isSubject: boolean;
      children?: Array<{
        __typename?: 'OrgUnitTreeNode';
        id: number;
        name?: string | null;
        isSubject: boolean;
        children?: Array<{
          __typename?: 'OrgUnitTreeNode';
          id: number;
          name?: string | null;
          isSubject: boolean;
          children?: Array<{
            __typename?: 'OrgUnitTreeNode';
            id: number;
            name?: string | null;
            isSubject: boolean;
          }> | null;
        }> | null;
      }> | null;
    }>;
  };
};

export type GetOrgUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.OrgUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.OrgUnitSortInput> | Types.OrgUnitSortInput>;
}>;

export type GetOrgUnitsQuery = {
  __typename?: 'Query';
  orgUnit: {
    __typename?: 'OrgUnitQueries';
    listOrgUnits?: {
      __typename?: 'ListOrgUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'OrgUnit';
        id: number;
        name?: string | null;
        internalCode: string;
        externalCode?: string | null;
        entryStatus: Types.EntryStatus;
        closureDate?: string | null;
        orgUnitType: Types.OrgUnitType;
        cities: Array<{
          __typename?: 'City';
          guid: string;
          id: number;
          name: string;
          countyName?: string | null;
          countryName?: string | null;
          countryISO: string;
          cadastralCode?: string | null;
        }>;
        parentSubject:
          | {
              __typename: 'LegalSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              } | null;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              } | null;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            };
        parentOrgUnit?: {
          __typename?: 'OrgUnit';
          id: number;
          name?: string | null;
          orgUnitType: Types.OrgUnitType;
        } | null;
        contacts: Array<{
          __typename?: 'Contact';
          id: number;
          contactInfo?: string | null;
          contactInfoType: Types.ContactInfoType;
          contactType: Types.ContactType;
        }>;
      }> | null;
    } | null;
  };
};

export type GetAllOrgUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OrgUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.OrgUnitSortInput> | Types.OrgUnitSortInput>;
}>;

export type GetAllOrgUnitsQuery = {
  __typename?: 'Query';
  orgUnit: {
    __typename?: 'OrgUnitQueries';
    listOrgUnitsFull: Array<{
      __typename?: 'OrgUnit';
      id: number;
      name?: string | null;
      internalCode: string;
      externalCode?: string | null;
      entryStatus: Types.EntryStatus;
      closureDate?: string | null;
      orgUnitType: Types.OrgUnitType;
      cities: Array<{
        __typename?: 'City';
        guid: string;
        id: number;
        name: string;
        countyName?: string | null;
        countryName?: string | null;
        countryISO: string;
        cadastralCode?: string | null;
      }>;
      parentSubject:
        | {
            __typename: 'LegalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          };
      parentOrgUnit?: {
        __typename?: 'OrgUnit';
        id: number;
        name?: string | null;
        orgUnitType: Types.OrgUnitType;
      } | null;
      contacts: Array<{
        __typename?: 'Contact';
        id: number;
        contactInfo?: string | null;
        contactInfoType: Types.ContactInfoType;
        contactType: Types.ContactType;
      }>;
    }>;
  };
};

export type GetAllOrgUnitsByManagementSubjectIdsQueryVariables = Types.Exact<{
  managementSubjectIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.OrgUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.OrgUnitSortInput> | Types.OrgUnitSortInput>;
}>;

export type GetAllOrgUnitsByManagementSubjectIdsQuery = {
  __typename?: 'Query';
  orgUnit: {
    __typename?: 'OrgUnitQueries';
    listOrgUnitsByManagementSubject: Array<{
      __typename?: 'OrgUnit';
      id: number;
      name?: string | null;
      internalCode: string;
      externalCode?: string | null;
      entryStatus: Types.EntryStatus;
      closureDate?: string | null;
      orgUnitType: Types.OrgUnitType;
      cities: Array<{
        __typename?: 'City';
        guid: string;
        id: number;
        name: string;
        countyName?: string | null;
        countryName?: string | null;
        countryISO: string;
        cadastralCode?: string | null;
      }>;
      parentSubject:
        | {
            __typename: 'LegalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          };
      parentOrgUnit?: {
        __typename?: 'OrgUnit';
        id: number;
        name?: string | null;
        orgUnitType: Types.OrgUnitType;
      } | null;
      contacts: Array<{
        __typename?: 'Contact';
        id: number;
        contactInfo?: string | null;
        contactInfoType: Types.ContactInfoType;
        contactType: Types.ContactType;
      }>;
    }>;
  };
};

export type GetOrgUnitQueryVariables = Types.Exact<{
  orgUnitId: Types.Scalars['Int']['input'];
}>;

export type GetOrgUnitQuery = {
  __typename?: 'Query';
  orgUnit: {
    __typename?: 'OrgUnitQueries';
    orgUnit?: {
      __typename?: 'OrgUnit';
      id: number;
      name?: string | null;
      internalCode: string;
      externalCode?: string | null;
      entryStatus: Types.EntryStatus;
      closureDate?: string | null;
      orgUnitType: Types.OrgUnitType;
      cities: Array<{
        __typename?: 'City';
        guid: string;
        id: number;
        name: string;
        countyName?: string | null;
        countryName?: string | null;
        countryISO: string;
        cadastralCode?: string | null;
      }>;
      parentSubject:
        | {
            __typename: 'LegalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            } | null;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            name: string;
            id: number;
            personType: Types.PersonType;
            relationSubordinates: Array<{
              __typename?: 'SubjectRelation';
              relationType: Types.SubjectRelationType;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
            }>;
          };
      parentOrgUnit?: {
        __typename?: 'OrgUnit';
        id: number;
        name?: string | null;
        orgUnitType: Types.OrgUnitType;
      } | null;
      contacts: Array<{
        __typename?: 'Contact';
        id: number;
        contactInfo?: string | null;
        contactInfoType: Types.ContactInfoType;
        contactType: Types.ContactType;
      }>;
    } | null;
  };
};

export type CreateManagementOrgUnitMutationVariables = Types.Exact<{
  orgUnitInput: Types.ManagementOrgUnitInput;
}>;

export type CreateManagementOrgUnitMutation = {
  __typename?: 'Mutation';
  orgUnit: {
    __typename?: 'OrgUnitMutations';
    addManagementOrgUnit: {
      __typename?: 'ResultOfOrgUnit';
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

export type CreateGeographicalOrgUnitMutationVariables = Types.Exact<{
  orgUnitInput: Types.GeographicalOrgUnitInput;
}>;

export type CreateGeographicalOrgUnitMutation = {
  __typename?: 'Mutation';
  orgUnit: {
    __typename?: 'OrgUnitMutations';
    addGeographicalOrgUnit: {
      __typename?: 'ResultOfOrgUnit';
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

export type UpdateManagementOrgUnitMutationVariables = Types.Exact<{
  input: Types.ManagementOrgUnitInput;
}>;

export type UpdateManagementOrgUnitMutation = {
  __typename?: 'Mutation';
  orgUnit: {
    __typename?: 'OrgUnitMutations';
    updateManagementOrgUnit: {
      __typename?: 'ResultOfOrgUnit';
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

export type UpdateGeographicalOrgUnitMutationVariables = Types.Exact<{
  input: Types.GeographicalOrgUnitInput;
}>;

export type UpdateGeographicalOrgUnitMutation = {
  __typename?: 'Mutation';
  orgUnit: {
    __typename?: 'OrgUnitMutations';
    updateGeographicalOrgUnit: {
      __typename?: 'ResultOfOrgUnit';
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

export type DeleteOrgUnitMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteOrgUnitMutation = {
  __typename?: 'Mutation';
  orgUnit: {
    __typename?: 'OrgUnitMutations';
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

export type GetOrgUnitInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetOrgUnitInternalCodeQuery = {
  __typename?: 'Query';
  orgUnit: { __typename?: 'OrgUnitQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseOrgUnitInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentOrgUnitId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseOrgUnitInternalCodeQuery = {
  __typename?: 'Query';
  orgUnit: { __typename?: 'OrgUnitQueries'; canUseInternalCode: boolean };
};

export const GetOrgUnitsTreeDocument = gql`
  query getOrgUnitsTree($orgUnitType: OrgUnitType!) {
    orgUnit {
      listOrgUnitsTree(orgUnitType: $orgUnitType) {
        ...OrgUnitTreeNodeFragment
      }
    }
  }
  ${OrgUnitTreeNodeFragmentDoc}
`;

export function useGetOrgUnitsTreeQuery(options: Omit<Urql.UseQueryArgs<GetOrgUnitsTreeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrgUnitsTreeQuery, GetOrgUnitsTreeQueryVariables>({
    query: GetOrgUnitsTreeDocument,
    ...options,
  });
}
export const GetOrgUnitsDocument = gql`
  query getOrgUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: OrgUnitFilterInput
    $order: [OrgUnitSortInput!]
  ) {
    orgUnit {
      listOrgUnits(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...OrgUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${OrgUnitFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
`;

export function useGetOrgUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetOrgUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrgUnitsQuery, GetOrgUnitsQueryVariables>({ query: GetOrgUnitsDocument, ...options });
}
export const GetAllOrgUnitsDocument = gql`
  query getAllOrgUnits($where: OrgUnitFilterInput, $order: [OrgUnitSortInput!]) {
    orgUnit {
      listOrgUnitsFull(where: $where, order: $order) {
        ...OrgUnitFragment
      }
    }
  }
  ${OrgUnitFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
`;

export function useGetAllOrgUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetAllOrgUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllOrgUnitsQuery, GetAllOrgUnitsQueryVariables>({
    query: GetAllOrgUnitsDocument,
    ...options,
  });
}
export const GetAllOrgUnitsByManagementSubjectIdsDocument = gql`
  query getAllOrgUnitsByManagementSubjectIds(
    $managementSubjectIds: [Int!]!
    $where: OrgUnitFilterInput
    $order: [OrgUnitSortInput!]
  ) {
    orgUnit {
      listOrgUnitsByManagementSubject(managementSubjectIds: $managementSubjectIds, where: $where, order: $order) {
        ...OrgUnitFragment
      }
    }
  }
  ${OrgUnitFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
`;

export function useGetAllOrgUnitsByManagementSubjectIdsQuery(
  options: Omit<Urql.UseQueryArgs<GetAllOrgUnitsByManagementSubjectIdsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllOrgUnitsByManagementSubjectIdsQuery, GetAllOrgUnitsByManagementSubjectIdsQueryVariables>({
    query: GetAllOrgUnitsByManagementSubjectIdsDocument,
    ...options,
  });
}
export const GetOrgUnitDocument = gql`
  query getOrgUnit($orgUnitId: Int!) {
    orgUnit {
      orgUnit(orgUnitId: $orgUnitId) {
        ...OrgUnitFragment
      }
    }
  }
  ${OrgUnitFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
`;

export function useGetOrgUnitQuery(options: Omit<Urql.UseQueryArgs<GetOrgUnitQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrgUnitQuery, GetOrgUnitQueryVariables>({ query: GetOrgUnitDocument, ...options });
}
export const CreateManagementOrgUnitDocument = gql`
  mutation createManagementOrgUnit($orgUnitInput: ManagementOrgUnitInput!) {
    orgUnit {
      addManagementOrgUnit(orgUnitInput: $orgUnitInput) {
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

export function useCreateManagementOrgUnitMutation() {
  return Urql.useMutation<CreateManagementOrgUnitMutation, CreateManagementOrgUnitMutationVariables>(
    CreateManagementOrgUnitDocument,
  );
}
export const CreateGeographicalOrgUnitDocument = gql`
  mutation createGeographicalOrgUnit($orgUnitInput: GeographicalOrgUnitInput!) {
    orgUnit {
      addGeographicalOrgUnit(orgUnitInput: $orgUnitInput) {
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

export function useCreateGeographicalOrgUnitMutation() {
  return Urql.useMutation<CreateGeographicalOrgUnitMutation, CreateGeographicalOrgUnitMutationVariables>(
    CreateGeographicalOrgUnitDocument,
  );
}
export const UpdateManagementOrgUnitDocument = gql`
  mutation updateManagementOrgUnit($input: ManagementOrgUnitInput!) {
    orgUnit {
      updateManagementOrgUnit(orgUnitInput: $input) {
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

export function useUpdateManagementOrgUnitMutation() {
  return Urql.useMutation<UpdateManagementOrgUnitMutation, UpdateManagementOrgUnitMutationVariables>(
    UpdateManagementOrgUnitDocument,
  );
}
export const UpdateGeographicalOrgUnitDocument = gql`
  mutation updateGeographicalOrgUnit($input: GeographicalOrgUnitInput!) {
    orgUnit {
      updateGeographicalOrgUnit(orgUnitInput: $input) {
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

export function useUpdateGeographicalOrgUnitMutation() {
  return Urql.useMutation<UpdateGeographicalOrgUnitMutation, UpdateGeographicalOrgUnitMutationVariables>(
    UpdateGeographicalOrgUnitDocument,
  );
}
export const DeleteOrgUnitDocument = gql`
  mutation deleteOrgUnit($id: Int!) {
    orgUnit {
      delete(orgUnitId: $id) {
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

export function useDeleteOrgUnitMutation() {
  return Urql.useMutation<DeleteOrgUnitMutation, DeleteOrgUnitMutationVariables>(DeleteOrgUnitDocument);
}
export const GetOrgUnitInternalCodeDocument = gql`
  query getOrgUnitInternalCode {
    orgUnit {
      proposeNewInternalCode
    }
  }
`;

export function useGetOrgUnitInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetOrgUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetOrgUnitInternalCodeQuery, GetOrgUnitInternalCodeQueryVariables>({
    query: GetOrgUnitInternalCodeDocument,
    ...options,
  });
}
export const CanUseOrgUnitInternalCodeDocument = gql`
  query canUseOrgUnitInternalCode($internalCode: String!, $currentOrgUnitId: Int) {
    orgUnit {
      canUseInternalCode(internalCode: $internalCode, currentOrgUnitId: $currentOrgUnitId)
    }
  }
`;

export function useCanUseOrgUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseOrgUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseOrgUnitInternalCodeQuery, CanUseOrgUnitInternalCodeQueryVariables>({
    query: CanUseOrgUnitInternalCodeDocument,
    ...options,
  });
}
