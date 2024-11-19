import { DocumentNode } from 'graphql';
import { PropsWithChildren } from 'react';
import { AnyVariables } from 'urql';

export interface OperationContextProps {
  handleDelete: (
    context: string,
    document: DocumentNode,
    onComplete: () => void,
    variables?: () => AnyVariables,
  ) => () => void;
  handleExport: (document: DocumentNode, variables?: AnyVariables) => () => void;
}

export type OperationProviderProps = PropsWithChildren<{
  id?: string | string[];
}>;
