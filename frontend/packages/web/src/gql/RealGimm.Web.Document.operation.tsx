// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CatalogueDocumentsCategoryOutputFragmentDoc } from './RealGimm.Web.CatalogueDocumentsCategoryOutput.fragment';
import { CatalogueDocumentsOutputFragmentDoc } from './RealGimm.Web.CatalogueDocumentsOutput.fragment';
import { ContractDocumentsOutputFragmentDoc } from './RealGimm.Web.ContractDocumentsOutput.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentRowFragmentDoc } from './RealGimm.Web.DocumentRow.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateDocumentsOutputFragmentDoc } from './RealGimm.Web.EstateDocumentsOutput.fragment';
import { EstateUnitDocumentsOutputFragmentDoc } from './RealGimm.Web.EstateUnitDocumentsOutput.fragment';
import { FacilityContractDocumentsOutputFragmentDoc } from './RealGimm.Web.FacilityContractDocumentsOutput.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { SubjectDocumentsOutputFragmentDoc } from './RealGimm.Web.SubjectDocumentsOutput.fragment';
import { TicketDocumentsOutputFragmentDoc } from './RealGimm.Web.TicketDocumentsOutput.fragment';

export type GetAllDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.DocumentRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.DocumentRowSortInput> | Types.DocumentRowSortInput>;
}>;

export type GetAllDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    allDocuments?: {
      __typename?: 'AllDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'DocumentRow';
        estateInternalCode?: string | null;
        estateUnitInternalCode?: string | null;
        catalogueItemInternalCode?: string | null;
        catalogueTypeInternalCode?: string | null;
        catalogueCategory?: string | null;
        catalogueSubCategory?: string | null;
        subjectInternalCode?: string | null;
        contractInternalCode?: string | null;
        isContractActive?: boolean | null;
        isContractSublocated?: boolean | null;
        estateId?: number | null;
        catalogueTypeId?: number | null;
        ticketId?: number | null;
        ticketInternalCode?: string | null;
        isTicketExcludedFromMaintenanceContract?: boolean | null;
        fcltContractId?: number | null;
        fcltContractInternalCode?: string | null;
        document: {
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
        };
      }> | null;
    } | null;
  };
};

export type GetAllEstateDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateDocumentsOutputSortInput> | Types.EstateDocumentsOutputSortInput>;
}>;

export type GetAllEstateDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    estateDocuments?: {
      __typename?: 'EstateDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateDocumentsOutput';
        estateInternalCode: string;
        guid: string;
        subRows: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllEstateUnitDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateUnitDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitDocumentsOutputSortInput> | Types.EstateUnitDocumentsOutputSortInput>;
}>;

export type GetAllEstateUnitDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    estateUnitDocuments?: {
      __typename?: 'EstateUnitDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateUnitDocumentsOutput';
        estateUnitInternalCode: string;
        guid: string;
        subRows: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllCatalogueDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueDocumentsOutputSortInput> | Types.CatalogueDocumentsOutputSortInput>;
}>;

export type GetAllCatalogueDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    catalogueDocuments?: {
      __typename?: 'CatalogueDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CatalogueDocumentsOutput';
        estateInternalCode: string;
        guid: string;
        subRows: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllSubjectDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.SubjectDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectDocumentsOutputSortInput> | Types.SubjectDocumentsOutputSortInput>;
}>;

export type GetAllSubjectDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    subjectDocuments?: {
      __typename?: 'SubjectDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'SubjectDocumentsOutput';
        subjectInternalCode: string;
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
      }> | null;
    } | null;
  };
};

export type GetAllContractDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ContractDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractDocumentsOutputSortInput> | Types.ContractDocumentsOutputSortInput>;
}>;

export type GetAllContractDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    contractDocuments?: {
      __typename?: 'ContractDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ContractDocumentsOutput';
        guid: string;
        contractInternalCode: string;
        subRows: Array<{
          __typename?: 'ContractDocumentsPerContentCategoryGroupOutput';
          guid: string;
          contentCategoryGroup: string;
          subRows: Array<{
            __typename?: 'ContractDocumentsPerContentCategoryOutput';
            guid: string;
            contentCategory: Types.ContentCategory;
            subRows: Array<{
              __typename?: 'ContractDocumentOutput';
              isContractSublocated: boolean;
              isContractActive: boolean;
              cmisId: string;
              creationDate: string;
              entityId?: string | null;
              entityIntId?: number | null;
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
      }> | null;
    } | null;
  };
};

export type GetAllFacilityContractDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FcltContractDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.FcltContractDocumentsOutputSortInput> | Types.FcltContractDocumentsOutputSortInput
  >;
}>;

export type GetAllFacilityContractDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    fcltContractDocuments?: {
      __typename?: 'FcltContractDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'FcltContractDocumentsOutput';
        guid: string;
        fcltContractInternalCode: string;
        subRows: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllTicketDocumentsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketDocumentsOutputSortInput> | Types.TicketDocumentsOutputSortInput>;
}>;

export type GetAllTicketDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    ticketDocuments?: {
      __typename?: 'TicketDocumentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketDocumentsOutput';
        guid: string;
        ticketInternalCode: string;
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
      }> | null;
    } | null;
  };
};

export type ExportDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.DocumentRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.DocumentRowSortInput> | Types.DocumentRowSortInput>;
}>;

export type ExportDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportEstateDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateDocumentsOutputSortInput> | Types.EstateDocumentsOutputSortInput>;
}>;

export type ExportEstateDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportEstateDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportEstateUnitDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUnitDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitDocumentsOutputSortInput> | Types.EstateUnitDocumentsOutputSortInput>;
}>;

export type ExportEstateUnitDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportEstateUnitDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportCatalogueDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueDocumentsOutputSortInput> | Types.CatalogueDocumentsOutputSortInput>;
}>;

export type ExportCatalogueDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportCatalogueDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportSubjectDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SubjectDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectDocumentsOutputSortInput> | Types.SubjectDocumentsOutputSortInput>;
}>;

export type ExportSubjectDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportSubjectDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportContractDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractDocumentsOutputSortInput> | Types.ContractDocumentsOutputSortInput>;
}>;

export type ExportContractDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportContractDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportFacilityContractDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FcltContractDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.FcltContractDocumentsOutputSortInput> | Types.FcltContractDocumentsOutputSortInput
  >;
}>;

export type ExportFacilityContractDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportFcltContractDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportTicketDocumentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketDocumentsOutputSortInput> | Types.TicketDocumentsOutputSortInput>;
}>;

export type ExportTicketDocumentsQuery = {
  __typename?: 'Query';
  document: {
    __typename?: 'DocumentQueries';
    exportTicketDocumentsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetAllDocumentsDocument = gql`
  query getAllDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: DocumentRowFilterInput
    $order: [DocumentRowSortInput!]
  ) {
    document {
      allDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...DocumentRowFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${DocumentRowFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllDocumentsQuery(options?: Omit<Urql.UseQueryArgs<GetAllDocumentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>({
    query: GetAllDocumentsDocument,
    ...options,
  });
}
export const GetAllEstateDocumentsDocument = gql`
  query getAllEstateDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateDocumentsFlatOutputFilterInput
    $order: [EstateDocumentsOutputSortInput!]
  ) {
    document {
      estateDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...EstateDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateDocumentsOutputFragmentDoc}
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllEstateDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllEstateDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllEstateDocumentsQuery, GetAllEstateDocumentsQueryVariables>({
    query: GetAllEstateDocumentsDocument,
    ...options,
  });
}
export const GetAllEstateUnitDocumentsDocument = gql`
  query getAllEstateUnitDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateUnitDocumentsFlatOutputFilterInput
    $order: [EstateUnitDocumentsOutputSortInput!]
  ) {
    document {
      estateUnitDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...EstateUnitDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateUnitDocumentsOutputFragmentDoc}
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllEstateUnitDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllEstateUnitDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllEstateUnitDocumentsQuery, GetAllEstateUnitDocumentsQueryVariables>({
    query: GetAllEstateUnitDocumentsDocument,
    ...options,
  });
}
export const GetAllCatalogueDocumentsDocument = gql`
  query getAllCatalogueDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueDocumentsFlatOutputFilterInput
    $order: [CatalogueDocumentsOutputSortInput!]
  ) {
    document {
      catalogueDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CatalogueDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueDocumentsOutputFragmentDoc}
  ${CatalogueDocumentsCategoryOutputFragmentDoc}
`;

export function useGetAllCatalogueDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllCatalogueDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllCatalogueDocumentsQuery, GetAllCatalogueDocumentsQueryVariables>({
    query: GetAllCatalogueDocumentsDocument,
    ...options,
  });
}
export const GetAllSubjectDocumentsDocument = gql`
  query getAllSubjectDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: SubjectDocumentsFlatOutputFilterInput
    $order: [SubjectDocumentsOutputSortInput!]
  ) {
    document {
      subjectDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...SubjectDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${SubjectDocumentsOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllSubjectDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllSubjectDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllSubjectDocumentsQuery, GetAllSubjectDocumentsQueryVariables>({
    query: GetAllSubjectDocumentsDocument,
    ...options,
  });
}
export const GetAllContractDocumentsDocument = gql`
  query getAllContractDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ContractDocumentsFlatOutputFilterInput
    $order: [ContractDocumentsOutputSortInput!]
  ) {
    document {
      contractDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...ContractDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${ContractDocumentsOutputFragmentDoc}
`;

export function useGetAllContractDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllContractDocumentsQuery, GetAllContractDocumentsQueryVariables>({
    query: GetAllContractDocumentsDocument,
    ...options,
  });
}
export const GetAllFacilityContractDocumentsDocument = gql`
  query getAllFacilityContractDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FcltContractDocumentsFlatOutputFilterInput
    $order: [FcltContractDocumentsOutputSortInput!]
  ) {
    document {
      fcltContractDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FacilityContractDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FacilityContractDocumentsOutputFragmentDoc}
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllFacilityContractDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllFacilityContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllFacilityContractDocumentsQuery, GetAllFacilityContractDocumentsQueryVariables>({
    query: GetAllFacilityContractDocumentsDocument,
    ...options,
  });
}
export const GetAllTicketDocumentsDocument = gql`
  query getAllTicketDocuments(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketDocumentsFlatOutputFilterInput
    $order: [TicketDocumentsOutputSortInput!]
  ) {
    document {
      ticketDocuments(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketDocumentsOutputFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketDocumentsOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetAllTicketDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllTicketDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllTicketDocumentsQuery, GetAllTicketDocumentsQueryVariables>({
    query: GetAllTicketDocumentsDocument,
    ...options,
  });
}
export const ExportDocumentsDocument = gql`
  query exportDocuments($where: DocumentRowFilterInput, $order: [DocumentRowSortInput!]) {
    document {
      exportDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportDocumentsQuery(options?: Omit<Urql.UseQueryArgs<ExportDocumentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportDocumentsQuery, ExportDocumentsQueryVariables>({
    query: ExportDocumentsDocument,
    ...options,
  });
}
export const ExportEstateDocumentsDocument = gql`
  query exportEstateDocuments($where: EstateDocumentsFlatOutputFilterInput, $order: [EstateDocumentsOutputSortInput!]) {
    document {
      exportEstateDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportEstateDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportEstateDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportEstateDocumentsQuery, ExportEstateDocumentsQueryVariables>({
    query: ExportEstateDocumentsDocument,
    ...options,
  });
}
export const ExportEstateUnitDocumentsDocument = gql`
  query exportEstateUnitDocuments(
    $where: EstateUnitDocumentsFlatOutputFilterInput
    $order: [EstateUnitDocumentsOutputSortInput!]
  ) {
    document {
      exportEstateUnitDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportEstateUnitDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportEstateUnitDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportEstateUnitDocumentsQuery, ExportEstateUnitDocumentsQueryVariables>({
    query: ExportEstateUnitDocumentsDocument,
    ...options,
  });
}
export const ExportCatalogueDocumentsDocument = gql`
  query exportCatalogueDocuments(
    $where: CatalogueDocumentsFlatOutputFilterInput
    $order: [CatalogueDocumentsOutputSortInput!]
  ) {
    document {
      exportCatalogueDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCatalogueDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportCatalogueDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportCatalogueDocumentsQuery, ExportCatalogueDocumentsQueryVariables>({
    query: ExportCatalogueDocumentsDocument,
    ...options,
  });
}
export const ExportSubjectDocumentsDocument = gql`
  query exportSubjectDocuments(
    $where: SubjectDocumentsFlatOutputFilterInput
    $order: [SubjectDocumentsOutputSortInput!]
  ) {
    document {
      exportSubjectDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportSubjectDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportSubjectDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportSubjectDocumentsQuery, ExportSubjectDocumentsQueryVariables>({
    query: ExportSubjectDocumentsDocument,
    ...options,
  });
}
export const ExportContractDocumentsDocument = gql`
  query exportContractDocuments(
    $where: ContractDocumentsFlatOutputFilterInput
    $order: [ContractDocumentsOutputSortInput!]
  ) {
    document {
      exportContractDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportContractDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportContractDocumentsQuery, ExportContractDocumentsQueryVariables>({
    query: ExportContractDocumentsDocument,
    ...options,
  });
}
export const ExportFacilityContractDocumentsDocument = gql`
  query exportFacilityContractDocuments(
    $where: FcltContractDocumentsFlatOutputFilterInput
    $order: [FcltContractDocumentsOutputSortInput!]
  ) {
    document {
      exportFcltContractDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportFacilityContractDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportFacilityContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportFacilityContractDocumentsQuery, ExportFacilityContractDocumentsQueryVariables>({
    query: ExportFacilityContractDocumentsDocument,
    ...options,
  });
}
export const ExportTicketDocumentsDocument = gql`
  query exportTicketDocuments($where: TicketDocumentsFlatOutputFilterInput, $order: [TicketDocumentsOutputSortInput!]) {
    document {
      exportTicketDocumentsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTicketDocumentsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportTicketDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportTicketDocumentsQuery, ExportTicketDocumentsQueryVariables>({
    query: ExportTicketDocumentsDocument,
    ...options,
  });
}
