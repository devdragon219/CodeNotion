// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ValidationErrorFragment = {
  __typename?: 'ValidationError';
  identifier?: string | null;
  errorMessage?: string | null;
  errorCode?: string | null;
  severity: Types.ValidationSeverity;
};

export const ValidationErrorFragmentDoc = gql`
  fragment ValidationErrorFragment on ValidationError {
    identifier
    errorMessage
    errorCode
    severity
  }
`;
