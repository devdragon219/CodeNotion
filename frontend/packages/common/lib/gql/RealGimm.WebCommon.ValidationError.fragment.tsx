// @ts-nocheck
import gql from 'graphql-tag';

import * as Types from './types';

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
