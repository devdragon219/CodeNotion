// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CalendarFragmentDoc } from './RealGimm.Web.Calendar.fragment';
import { CalendarDayFragmentDoc } from './RealGimm.Web.CalendarDay.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCalendarsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CalendarFilterInput>;
  order?: Types.InputMaybe<Array<Types.CalendarSortInput> | Types.CalendarSortInput>;
}>;

export type GetCalendarsQuery = {
  __typename?: 'Query';
  calendar: {
    __typename?: 'CalendarQueries';
    listCalendars?: {
      __typename?: 'ListCalendarsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'Calendar';
        name: string;
        timeZoneId: string;
        id: number;
        sunday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        monday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        tuesday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        wednesday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        thursday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        friday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        saturday?: {
          __typename?: 'CalendarDay';
          dayOfWeek: Types.DayOfWeek;
          id: number;
          timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
        } | null;
        holidays: Array<{
          __typename?: 'Holiday';
          name: string;
          date: string;
          periodicity: Types.HolidayPeriodicity;
          id: number;
        }>;
      }> | null;
    } | null;
  };
};

export type GetAllCalendarsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CalendarFilterInput>;
  order?: Types.InputMaybe<Array<Types.CalendarSortInput> | Types.CalendarSortInput>;
}>;

export type GetAllCalendarsQuery = {
  __typename?: 'Query';
  calendar: {
    __typename?: 'CalendarQueries';
    listCalendarsFull: Array<{
      __typename?: 'Calendar';
      name: string;
      timeZoneId: string;
      id: number;
      sunday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      monday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      tuesday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      wednesday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      thursday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      friday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      saturday?: {
        __typename?: 'CalendarDay';
        dayOfWeek: Types.DayOfWeek;
        id: number;
        timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
      } | null;
      holidays: Array<{
        __typename?: 'Holiday';
        name: string;
        date: string;
        periodicity: Types.HolidayPeriodicity;
        id: number;
      }>;
    }>;
  };
};

export type AddCalendarMutationVariables = Types.Exact<{
  input: Types.CalendarInput;
}>;

export type AddCalendarMutation = {
  __typename?: 'Mutation';
  calendar: {
    __typename?: 'CalendarMutations';
    add: {
      __typename?: 'ResultOfCalendar';
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

export type UpdateCalendarMutationVariables = Types.Exact<{
  calendarId: Types.Scalars['Int']['input'];
  input: Types.CalendarInput;
}>;

export type UpdateCalendarMutation = {
  __typename?: 'Mutation';
  calendar: {
    __typename?: 'CalendarMutations';
    update: {
      __typename?: 'ResultOfCalendar';
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

export type DeleteCalendarsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCalendarsMutation = {
  __typename?: 'Mutation';
  calendar: {
    __typename?: 'CalendarMutations';
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

export type DeleteCalendarMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCalendarMutation = {
  __typename?: 'Mutation';
  calendar: {
    __typename?: 'CalendarMutations';
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

export type ExportCalendarsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CalendarFilterInput>;
  order?: Types.InputMaybe<Array<Types.CalendarSortInput> | Types.CalendarSortInput>;
}>;

export type ExportCalendarsQuery = {
  __typename?: 'Query';
  calendar: { __typename?: 'CalendarQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export const GetCalendarsDocument = gql`
  query getCalendars(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CalendarFilterInput
    $order: [CalendarSortInput!]
  ) {
    calendar {
      listCalendars(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CalendarFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CalendarFragmentDoc}
  ${CalendarDayFragmentDoc}
`;

export function useGetCalendarsQuery(options?: Omit<Urql.UseQueryArgs<GetCalendarsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCalendarsQuery, GetCalendarsQueryVariables>({ query: GetCalendarsDocument, ...options });
}
export const GetAllCalendarsDocument = gql`
  query getAllCalendars($where: CalendarFilterInput, $order: [CalendarSortInput!]) {
    calendar {
      listCalendarsFull(where: $where, order: $order) {
        ...CalendarFragment
      }
    }
  }
  ${CalendarFragmentDoc}
  ${CalendarDayFragmentDoc}
`;

export function useGetAllCalendarsQuery(options?: Omit<Urql.UseQueryArgs<GetAllCalendarsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCalendarsQuery, GetAllCalendarsQueryVariables>({
    query: GetAllCalendarsDocument,
    ...options,
  });
}
export const AddCalendarDocument = gql`
  mutation addCalendar($input: CalendarInput!) {
    calendar {
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

export function useAddCalendarMutation() {
  return Urql.useMutation<AddCalendarMutation, AddCalendarMutationVariables>(AddCalendarDocument);
}
export const UpdateCalendarDocument = gql`
  mutation updateCalendar($calendarId: Int!, $input: CalendarInput!) {
    calendar {
      update(id: $calendarId, input: $input) {
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

export function useUpdateCalendarMutation() {
  return Urql.useMutation<UpdateCalendarMutation, UpdateCalendarMutationVariables>(UpdateCalendarDocument);
}
export const DeleteCalendarsDocument = gql`
  mutation deleteCalendars($ids: [Int!]!) {
    calendar {
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

export function useDeleteCalendarsMutation() {
  return Urql.useMutation<DeleteCalendarsMutation, DeleteCalendarsMutationVariables>(DeleteCalendarsDocument);
}
export const DeleteCalendarDocument = gql`
  mutation deleteCalendar($id: Int!) {
    calendar {
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

export function useDeleteCalendarMutation() {
  return Urql.useMutation<DeleteCalendarMutation, DeleteCalendarMutationVariables>(DeleteCalendarDocument);
}
export const ExportCalendarsDocument = gql`
  query exportCalendars($where: CalendarFilterInput, $order: [CalendarSortInput!]) {
    calendar {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCalendarsQuery(options?: Omit<Urql.UseQueryArgs<ExportCalendarsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportCalendarsQuery, ExportCalendarsQueryVariables>({
    query: ExportCalendarsDocument,
    ...options,
  });
}
