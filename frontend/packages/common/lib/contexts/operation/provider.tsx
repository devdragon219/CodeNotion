import { CancelOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ParseKeys } from 'i18next';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AnyVariables, DocumentInput, OperationResult, useClient } from 'urql';

import { ConfirmationDialog } from '../../components/ConfirmationDialog/ConfirmationDialog';
import { Loader } from '../../components/Loader/Loader';
import { ValidationError } from '../../gql/types';
import { downloadFile } from '../../utils/fileUtils';
import { findValueForKey } from '../../utils/objectUtils';
import { useSnackbar } from '../snackbar/hook';
import { OperationContext } from './context';
import { OperationContextProps, OperationProviderProps } from './types';

interface DeleteDialogProps {
  context: string;
  document: DocumentInput;
  onComplete: () => void;
  variables?: () => AnyVariables;
}

export const OperationProvider = ({ children, id = 'id' }: OperationProviderProps) => {
  const client = useClient();
  const { showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [deleteDialogProps, setDeleteDialogProps] = useState<DeleteDialogProps | null>(null);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogProps(null);
  }, []);
  const confirmDelete = useCallback(async () => {
    if (deleteDialogProps) {
      const { context, document, onComplete, variables } = deleteDialogProps;
      setLoading(true);
      const result = await client.mutation(
        document,
        variables
          ? variables()
          : Array.isArray(id)
            ? id.reduce<Record<string, number>>(
                (acc, key) => ({
                  ...acc,
                  [key]: Number(params[key]),
                }),
                {},
              )
            : {
                id: Number(params[id]),
              },
      );
      setLoading(false);
      if (findValueForKey('isSuccess', result.data)) {
        showSnackbar(t(`${context}.feedback.delete.single` as ParseKeys), 'success');
        closeDeleteDialog();
        onComplete();
      } else {
        showError(findValueForKey('validationErrors', result.data) as ValidationError[] | undefined);
      }
    }
  }, [deleteDialogProps, client, id, params, showSnackbar, t, closeDeleteDialog, showError]);

  const handleDelete = useCallback(
    <Data, Variables>(
      context: string,
      document: DocumentInput<Data, Variables>,
      onComplete: () => void,
      variables?: () => AnyVariables,
    ) =>
      () => {
        setDeleteDialogProps({
          context,
          document,
          onComplete,
          variables,
        });
      },
    [],
  );

  const handleExport = useCallback(
    <Data, Variables>(document: DocumentInput<Data, Variables>, variables?: AnyVariables) =>
      async () => {
        setLoading(true);
        const result: OperationResult<Data> = await client.query(
          document,
          variables ?? {
            where: Array.isArray(id)
              ? id.reduce<Record<string, object>>(
                  (acc, key) => ({
                    ...acc,
                    [key]: { eq: Number(params[key]) },
                  }),
                  {},
                )
              : {
                  id: { eq: Number(params[id]) },
                },
          },
        );
        setLoading(false);
        const resourceUrl = findValueForKey('resourceUrl', result.data);
        if (resourceUrl && typeof resourceUrl === 'string') {
          downloadFile(resourceUrl);
        }
      },
    [client, id, params],
  );

  const contextValue: OperationContextProps = {
    handleDelete,
    handleExport,
  };

  return (
    <OperationContext.Provider value={contextValue}>
      {loading && <Loader />}
      {deleteDialogProps && (
        <ConfirmationDialog
          open
          onClose={closeDeleteDialog}
          type="danger"
          icon={CancelOutlined}
          title={`${deleteDialogProps.context}.dialog.delete.title` as ParseKeys}
          description={`${deleteDialogProps.context}.dialog.delete.description.single` as ParseKeys}
          actions={
            <>
              <Button color="secondary" onClick={closeDeleteDialog}>
                {t('common.button.cancel')}
              </Button>
              <Button color="destructive" onClick={confirmDelete}>
                {t('common.button.delete')}
              </Button>
            </>
          }
        />
      )}
      {children}
    </OperationContext.Provider>
  );
};
