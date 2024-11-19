import { TermType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { differenceInDays } from 'date-fns';
import { TFunction } from 'i18next';
import { ReactElement } from 'react';

import { AdministrationTermFragment } from '../../gql/RealGimm.Web.AdministrationTerm.fragment';

export const getAdministrationTermsColumns = (
  t: TFunction,
  showAll: (row: AdministrationTermFragment) => ReactElement,
): TableColumn<AdministrationTermFragment>[] => [
  {
    id: 'termType',
    label: 'administration_term.field.term_type',
    enableColumnFilter: true,
    options: Object.values(TermType),
    getOptionLabel: (option) => t(`common.enum.term_type.${option as TermType}`),
  },
  {
    id: 'name',
    label: 'administration_term.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'expectedAmount',
    label: 'administration_term.field.expected_amount',
    type: 'currency',
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    id: 'since',
    label: 'administration_term.field.since',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'until',
    label: 'administration_term.field.until',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'days',
    label: 'administration_term.field.days',
    getRowValue: (row) => {
      if (!row.since || !row.until) {
        return '-';
      }

      return differenceInDays(row.until, row.since);
    },
  },
  {
    id: 'installments',
    label: 'administration_term.field.installments',
    getRowValue: (row) => {
      if (row.installments.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
];
