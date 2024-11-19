import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteEstatesDocument,
  ExportEstatesDocument,
  GetEstatesQueryVariables,
  useCreateEstateMutation,
  useGetEstatesQuery,
} from '../../../gql/RealGimm.Web.Estate.operation';
import { useEstate } from '../../../hooks/useEstate';
import { useFeature } from '../../../hooks/useFeature';
import { EstateFormInput } from '../../../interfaces/FormInputs/Estate';
import { getEstatesColumns } from '../../../utils/estate/getEstatesColumns';
import { getEstatesFilterInput } from '../../../utils/estate/getEstatesFilterInput';
import { getEstatesSortInput } from '../../../utils/estate/getEstatesSortInput';
import { parseEstateFormInputToEstateInput } from '../../../utils/estate/parseEstateFormInput';
import { EstateCreateDialog } from '../../wizards/Estate/Estate';
import { EstatesTableProps } from './Estates.types';

export const EstatesTable = ({ status }: EstatesTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_ESTATE_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetEstatesQueryVariables>((variables) => ({
    ...variables,
    ...(status
      ? {
          where: {
            ...(variables.where ?? {}),
            status: {
              eq: status,
            },
          },
        }
      : {}),
  }));
  const [queryState, reexecuteQuery] = useGetEstatesQuery({ pause, variables });
  const [, createEstateMutation] = useCreateEstateMutation();
  const { addDocumentsAsync } = useEstate();
  const [loading, setLoading] = useState(false);
  const [isCreateEstateDialogOpen, setCreateEstateDialogOpen] = useState(false);
  const estates = useMemo(() => queryState.data?.estate.listEstates, [queryState.data]);

  const handleOpenCreateEstateDialog = useCallback(() => {
    setCreateEstateDialogOpen(true);
  }, []);

  const handleCloseCreateEstateDialog = useCallback(() => {
    setCreateEstateDialogOpen(false);
  }, []);
  const handleSaveCreateEstate = useCallback(
    async (estate: EstateFormInput) => {
      setLoading(true);
      const result = await createEstateMutation({ estateInput: parseEstateFormInputToEstateInput(estate) });
      setLoading(false);
      if (result.data?.estate.addEstate.isSuccess) {
        showSnackbar(t('estate.feedback.create'), 'success');
        addDocumentsAsync(result.data.estate.addEstate.value!.id, estate.documents, estate.images);
        handleCloseCreateEstateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.estate.addEstate.validationErrors);
      }
    },
    [
      t,
      createEstateMutation,
      addDocumentsAsync,
      handleCloseCreateEstateDialog,
      reexecuteQuery,
      showSnackbar,
      showError,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        columns={getEstatesColumns(language, t, { useStatus: !status })}
        empty="estate.text.no_estates"
        initialState={initialState}
        rows={estates?.nodes ?? []}
        totalCount={estates?.totalCount ?? 0}
        getRowId={({ id }) => String(id)}
        onAdd={canCreate ? handleOpenCreateEstateDialog : undefined}
        onDelete={canDelete ? handleDelete('estate', DeleteEstatesDocument, reexecuteQuery) : undefined}
        onEdit={
          canUpdate
            ? (row) => {
                navigate(`/app/real-estate/estates/${row.id}`, { state: { readonly: false } });
              }
            : undefined
        }
        onExport={canRead ? handleExport('id', ExportEstatesDocument) : undefined}
        onFilter={handleFilter(getEstatesFilterInput)}
        onPageChange={handlePageChange(estates?.pageInfo)}
        onStateChange={setInitialState}
        onSort={handleSort(getEstatesSortInput)}
        onView={
          canRead
            ? (row) => {
                navigate(`/app/real-estate/estates/${row.id}`);
              }
            : undefined
        }
      />
      {isCreateEstateDialogOpen && (
        <EstateCreateDialog onClose={handleCloseCreateEstateDialog} onSave={handleSaveCreateEstate} />
      )}
    </>
  );
};
