import { WarningAmber } from '@mui/icons-material';
import { ContentCategoryDomain, ContentCategoryGroup } from '@realgimm5/frontend-common/enums';
import { ContentCategory } from '@realgimm5/frontend-common/gql/types';
import { DocumentsTableColumn } from '@realgimm5/frontend-common/interfaces';
import {
  getContentCategoryGroup,
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  parseStringToDate,
} from '@realgimm5/frontend-common/utils';
import { differenceInDays, isBefore, startOfToday } from 'date-fns';
import { TFunction } from 'i18next';

import { UNSUPPORTED_RAW_FEATURES } from '../../../configs/features';
import { RawFeature } from '../../../enums/RawFeature';
import { DocumentRowFragment } from '../../../gql/RealGimm.Web.DocumentRow.fragment';

export const getAllDocumentsColumns = (
  t: TFunction,
  status?: 'expiring' | 'expired',
): DocumentsTableColumn<DocumentRowFragment>[] => [
  {
    id: 'document.name',
    label: 'document.field.document_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'document.identityType',
    label: 'document.field.identity_document_type',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    multiple: true,
    options: [ContentCategory.SbjIdentityNational, ContentCategory.SbjIdentityPassport, ContentCategory.SbjOther],
    getOptionLabel: (option) => (option ? t(`common.enum.content_category.${option as ContentCategory}`) : '-'),
    getRowValue: (row) => {
      const { contentCategory } = row.document;
      if (
        ![ContentCategory.SbjIdentityNational, ContentCategory.SbjIdentityPassport, ContentCategory.SbjOther].includes(
          contentCategory,
        )
      ) {
        return null;
      }
      return contentCategory;
    },
  },
  {
    id: 'document.protocolNumber',
    label: 'document.field.protocol_number',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.document.protocolNumber ?? '-',
  },
  {
    id: 'document.contentCategory',
    label: 'document.field.content_category',
    multiple: true,
    options: Object.values(ContentCategoryDomain).map((domain) => ({
      options: getContentCategoryGroupOptions(domain).map((group) => ({
        options: getContentCategoryOptions(group),
        value: group,
      })),
      value: domain,
    })),
    enableColumnFilter: true,
    useRowValue: true,
    getOptionLabel: (option) => {
      if (Object.values(ContentCategory).includes(option as ContentCategory)) {
        return t(`common.enum.content_category.${option as ContentCategory}`);
      }
      if (Object.values(ContentCategoryGroup).includes(option as ContentCategoryGroup)) {
        return t(`common.enum.content_category_group.${option as ContentCategoryGroup}`);
      }
      return t(`common.enum.content_category_domain.${option as ContentCategoryDomain}`);
    },
    getRowValue: (row) =>
      `${t(`common.enum.content_category_group.${getContentCategoryGroup(row.document.contentCategory)}`)} / ${t(
        `common.enum.content_category.${row.document.contentCategory}`,
      )}`,
  },
  {
    id: 'document.since',
    label: 'document.field.since',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'document.until',
    label: 'document.field.until',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'document.issueDate',
    label: 'document.field.issue_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'document.issuer',
    label: 'document.field.issuer',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.document.issuer ?? '-',
  },
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_BASE)
    ? []
    : [
        {
          id: 'estateInternalCode',
          label: 'document.field.estate',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.estateInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATEUNIT_BASE)
    ? []
    : [
        {
          id: 'estateUnitInternalCode',
          label: 'document.field.estate_unit',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.estateUnitInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ANAG_SUBJECT_BASE)
    ? []
    : [
        {
          id: 'subjectInternalCode',
          label: 'document.field.subject',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.subjectInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_CATALOGUE)
    ? []
    : [
        {
          id: 'catalogueItemInternalCode',
          label: 'document.field.catalogue_item',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.catalogueItemInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_CATALOGUE)
    ? []
    : [
        {
          id: 'catalogueCategory',
          label: 'document.field.catalogue_category',
          initialVisibility: 'hidden',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.catalogueCategory ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ESTATE_CATALOGUE)
    ? []
    : [
        {
          id: 'catalogueSubCategory',
          label: 'document.field.catalogue_sub_category',
          initialVisibility: 'hidden',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.catalogueSubCategory ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.PROP_CONTRACT_BASE)
    ? []
    : [
        {
          id: 'contractInternalCode',
          label: 'document.field.contract',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.contractInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.FCLT_CONTRACT_BASE)
    ? []
    : [
        {
          id: 'fcltContractInternalCode',
          label: 'document.field.facility_contract',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.fcltContractInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.FCLT_TICKET)
    ? []
    : [
        {
          id: 'ticketInternalCode',
          label: 'document.field.ticket',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.ticketInternalCode ?? '-',
        },
      ]) as DocumentsTableColumn<DocumentRowFragment>[]),
  {
    id: 'document.fileName',
    label: 'document.field.file_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.document.fileName ?? '-',
  },
  {
    id: 'document.uploaderName',
    label: 'document.field.uploader_name',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.document.uploaderName ?? '-',
  },
  {
    id: 'document.creationDate',
    label: 'document.field.creation_date',
    initialVisibility: 'hidden',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  status === 'expired'
    ? {
        id: 'document.expiredDays',
        label: 'document.field.expired_days',
        sticky: 'right',
        getRowValue: (row) => {
          const until = parseStringToDate(row.document.until);
          return until ? differenceInDays(startOfToday(), until) : null;
        },
      }
    : status === 'expiring'
      ? {
          id: 'document.expiringDays',
          label: 'document.field.expiring_days',
          sticky: 'right',
          getRowValue: (row) => {
            const until = parseStringToDate(row.document.until);
            return until ? differenceInDays(until, startOfToday()) : null;
          },
        }
      : {
          id: 'document.expired',
          label: 'document.field.expired',
          type: 'boolean',
          sticky: 'right',
          enableColumnFilter: true,
          useRowValue: true,
          getRowValue: (row) => {
            const until = parseStringToDate(row.document.until);
            return until && isBefore(until, startOfToday()) ? (
              <WarningAmber
                sx={(theme) => ({
                  color: theme.palette.danger[300],
                  width: 24,
                  height: 24,
                })}
              />
            ) : null;
          },
        },
];
