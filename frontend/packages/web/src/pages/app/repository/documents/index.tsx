import { Card, CardContent, CardHeader } from '@mui/material';
import { DocumentsTable, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { addDays, startOfToday } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { UNSUPPORTED_RAW_FEATURES } from '../../../../configs/features';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  ExportCatalogueDocumentsDocument,
  ExportContractDocumentsDocument,
  ExportDocumentsDocument,
  ExportEstateDocumentsDocument,
  ExportEstateUnitDocumentsDocument,
  ExportFacilityContractDocumentsDocument,
  ExportSubjectDocumentsDocument,
  ExportTicketDocumentsDocument,
  GetAllCatalogueDocumentsDocument,
  GetAllCatalogueDocumentsQueryVariables,
  GetAllContractDocumentsDocument,
  GetAllContractDocumentsQueryVariables,
  GetAllDocumentsDocument,
  GetAllDocumentsQueryVariables,
  GetAllEstateDocumentsDocument,
  GetAllEstateDocumentsQueryVariables,
  GetAllEstateUnitDocumentsDocument,
  GetAllEstateUnitDocumentsQueryVariables,
  GetAllFacilityContractDocumentsDocument,
  GetAllFacilityContractDocumentsQueryVariables,
  GetAllSubjectDocumentsDocument,
  GetAllSubjectDocumentsQueryVariables,
  GetAllTicketDocumentsDocument,
  GetAllTicketDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.Document.operation';
import { DocumentRowFragment } from '../../../../gql/RealGimm.Web.DocumentRow.fragment';
import { useFeature } from '../../../../hooks/useFeature';
import { getAllDocumentsColumns } from '../../../../utils/document/allDocuments/getAllDocumentsColumns';
import { getAllDocumentsFilterInput } from '../../../../utils/document/allDocuments/getAllDocumentsFilterInput';
import { getCatalogueDocumentsColumns } from '../../../../utils/document/catalogueDocuments/getCatalogueDocumentsColumns';
import { getCatalogueDocumentsFilterInput } from '../../../../utils/document/catalogueDocuments/getCatalogueDocumentsFilterInput';
import { getContractDocumentsColumns } from '../../../../utils/document/contractDocuments/getContractDocumentsColumns';
import { getContractDocumentsFilterInput } from '../../../../utils/document/contractDocuments/getContractDocumentsFilterInput';
import { getEstateDocumentsColumns } from '../../../../utils/document/estateDocuments/getEstateDocumentsColumns';
import { getEstateDocumentsFilterInput } from '../../../../utils/document/estateDocuments/getEstateDocumentsFilterInput';
import { getEstateUnitDocumentsColumns } from '../../../../utils/document/estateUnitDocuments/getEstateUnitDocumentsColumns';
import { getEstateUnitDocumentsFilterInput } from '../../../../utils/document/estateUnitDocuments/getEstateUnitDocumentsFilterInput';
import { getFacilityContractDocumentsColumns } from '../../../../utils/document/facilityContractDocuments/getFacilityContractDocumentsColumns';
import { getFacilityContractDocumentsFilterInput } from '../../../../utils/document/facilityContractDocuments/getFacilityContractDocumentsFilterInput';
import { getSubjectDocumentsColumns } from '../../../../utils/document/subjectDocuments/getSubjectDocumentsColumns';
import { getSubjectDocumentsFilterInput } from '../../../../utils/document/subjectDocuments/getSubjectDocumentsFilterInput';
import { getTicketDocumentsColumns } from '../../../../utils/document/ticketDocuments/getTicketDocumentsColumns';
import { getTicketDocumentsFilterInput } from '../../../../utils/document/ticketDocuments/getTicketDocumentsFilterInput';

export default function Documents() {
  useFeature(RawFeature.DOCUMENTS_BASE);
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();
  const tabsLocation = useTabsLocation();
  const status = useMemo(() => {
    switch (type) {
      case 'expired':
        return 'expired';
      case 'expiring':
        return 'expiring';
      default:
        return undefined;
    }
  }, [type]);

  const handleDocumentView = useCallback(
    (row: DocumentRowFragment) => {
      if (row.catalogueTypeId && row.estateId) {
        if (row.catalogueItemInternalCode) {
          navigate(
            `/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}/items/${row.document.entityIntId}#1`,
          );
        } else {
          navigate(`/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}#3`);
        }
      } else if (row.ticketInternalCode) {
        navigate(
          `/app/maintenance/tickets/${row.document.entityIntId}#${row.isTicketExcludedFromMaintenanceContract ? '6' : '5'}`,
        );
      } else if (row.fcltContractInternalCode) {
        navigate(`/app/maintenance/facility-contracts/${row.document.entityIntId}#10`);
      } else if (row.estateUnitInternalCode) {
        navigate(`/app/real-estate/estate-units/${row.document.entityIntId}#7`);
      } else if (row.estateInternalCode) {
        navigate(`/app/real-estate/estates/${row.document.entityIntId}#8`);
      } else if (row.subjectInternalCode) {
        navigate(`/app/registry/subjects/${row.document.entityIntId}#4`);
      } else if (row.contractInternalCode) {
        navigate(
          `/app/asset-management/contracts/${row.isContractActive ? 'active' : 'passive'}/${row.document.entityIntId}#${!row.isContractActive || row.isContractSublocated ? '12' : '11'}`,
        );
      }
    },
    [navigate],
  );

  return (
    <Card>
      <CardHeader title={t(`document.title.${status ?? 'documents'}`)} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        {status ? (
          <DocumentsTable<GetAllDocumentsQueryVariables, DocumentRowFragment>
            columns={getAllDocumentsColumns(t, status)}
            documentsKey="allDocuments"
            initialState={{
              sorting: [
                {
                  desc: false,
                  id: 'document.until',
                },
              ],
            }}
            query={GetAllDocumentsDocument}
            tableKey={status}
            useColumnVisibility
            usePagination
            useRowExpandCollapse={false}
            defaultVariables={(variables) => ({
              ...variables,
              where: {
                ...(variables.where ?? {}),
                document: {
                  ...(variables.where?.document ?? {}),
                  until:
                    status === 'expiring'
                      ? {
                          gte: parseDateToString(new Date()),
                          lte: parseDateToString(addDays(startOfToday(), 30)),
                        }
                      : {
                          lt: parseDateToString(new Date()),
                        },
                },
              },
            })}
            onFilter={getAllDocumentsFilterInput}
            onView={handleDocumentView}
          />
        ) : (
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'document.tab.all',
                children: (
                  <DocumentsTable<GetAllDocumentsQueryVariables, DocumentRowFragment>
                    columns={getAllDocumentsColumns(t)}
                    documentsKey="allDocuments"
                    exportDocument={ExportDocumentsDocument}
                    exportKey="document.cmisId"
                    initialState={{
                      sorting: [
                        {
                          desc: false,
                          id: 'document.name',
                        },
                      ],
                    }}
                    query={GetAllDocumentsDocument}
                    useColumnVisibility
                    usePagination
                    useRowExpandCollapse={false}
                    useRowSelection
                    useSelectedRows
                    onFilter={getAllDocumentsFilterInput}
                    onView={handleDocumentView}
                  />
                ),
              },
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_BASE)
                ? []
                : [
                    {
                      label: 'document.tab.estates',
                      children: (
                        <DocumentsTable<GetAllEstateDocumentsQueryVariables>
                          columns={getEstateDocumentsColumns(t)}
                          documentsKey="estateDocuments"
                          exportDocument={ExportEstateDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'estateInternalCode',
                              },
                            ],
                          }}
                          query={GetAllEstateDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getEstateDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId) navigate(`/app/real-estate/estates/${row.entityIntId}#8`);
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATEUNIT_BASE)
                ? []
                : [
                    {
                      label: 'document.tab.estate_units',
                      children: (
                        <DocumentsTable<GetAllEstateUnitDocumentsQueryVariables>
                          columns={getEstateUnitDocumentsColumns(t)}
                          documentsKey="estateUnitDocuments"
                          exportDocument={ExportEstateUnitDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'estateUnitInternalCode',
                              },
                            ],
                          }}
                          query={GetAllEstateUnitDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getEstateUnitDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId) navigate(`/app/real-estate/estate-units/${row.entityIntId}#7`);
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_CATALOGUE)
                ? []
                : [
                    {
                      label: 'document.tab.catalogues',
                      children: (
                        <DocumentsTable<GetAllCatalogueDocumentsQueryVariables>
                          columns={getCatalogueDocumentsColumns(t)}
                          documentsKey="catalogueDocuments"
                          exportDocument={ExportCatalogueDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'estateInternalCode',
                              },
                            ],
                          }}
                          query={GetAllCatalogueDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getCatalogueDocumentsFilterInput}
                          onView={(row) => {
                            if (row.estateId && row.catalogueTypeId) {
                              if (row.catalogueItemId) {
                                navigate(
                                  `/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}/items/${row.catalogueItemId}#1`,
                                );
                              } else {
                                navigate(`/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}#3`);
                              }
                            }
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ANAG_SUBJECT_BASE)
                ? []
                : [
                    {
                      label: 'document.tab.subjects',
                      children: (
                        <DocumentsTable<GetAllSubjectDocumentsQueryVariables>
                          columns={getSubjectDocumentsColumns(t)}
                          documentsKey="subjectDocuments"
                          exportDocument={ExportSubjectDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'subjectInternalCode',
                              },
                            ],
                          }}
                          query={GetAllSubjectDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getSubjectDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId) navigate(`/app/registry/subjects/${row.entityIntId}#4`);
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.PROP_CONTRACT_BASE)
                ? []
                : [
                    {
                      label: 'document.tab.contracts',
                      children: (
                        <DocumentsTable<GetAllContractDocumentsQueryVariables>
                          columns={getContractDocumentsColumns(t)}
                          documentsKey="contractDocuments"
                          exportDocument={ExportContractDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'contractInternalCode',
                              },
                            ],
                          }}
                          query={GetAllContractDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getContractDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId)
                              navigate(
                                `/app/asset-management/contracts/${row.isContractActive ? 'active' : 'passive'}/${row.entityIntId}#${!row.isContractActive || row.isContractSublocated ? '12' : '11'}`,
                              );
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.FCLT_CONTRACT_BASE)
                ? []
                : [
                    {
                      label: 'document.tab.facility_contracts',
                      children: (
                        <DocumentsTable<GetAllFacilityContractDocumentsQueryVariables>
                          columns={getFacilityContractDocumentsColumns(t)}
                          documentsKey="fcltContractDocuments"
                          exportDocument={ExportFacilityContractDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'fcltContractInternalCode',
                              },
                            ],
                          }}
                          query={GetAllFacilityContractDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getFacilityContractDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId) navigate(`/app/maintenance/facility-contracts/${row.entityIntId}#10`);
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.FCLT_TICKET)
                ? []
                : [
                    {
                      label: 'document.tab.tickets',
                      children: (
                        <DocumentsTable<GetAllTicketDocumentsQueryVariables>
                          columns={getTicketDocumentsColumns(t)}
                          documentsKey="ticketDocuments"
                          exportDocument={ExportTicketDocumentsDocument}
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'ticketInternalCode',
                              },
                            ],
                          }}
                          query={GetAllTicketDocumentsDocument}
                          usePagination
                          useSelectedRows
                          onFilter={getTicketDocumentsFilterInput}
                          onView={(row) => {
                            if (row.entityIntId) navigate(`/app/maintenance/tickets/${row.entityIntId}#1`);
                          }}
                        />
                      ),
                    },
                  ]) as Tab[]),
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
}
