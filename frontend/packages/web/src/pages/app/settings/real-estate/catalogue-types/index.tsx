import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CatalogueTypeCreateDialog } from '../../../../../components/wizards/CatalogueType/CatalogueType';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteCatalogueTypesDocument,
  ExportCatalogueTypesDocument,
  GetCatalogueTypesQueryVariables,
  useCreateCatalogueTypeMutation,
  useGetCatalogueTypesQuery,
} from '../../../../../gql/RealGimm.Web.CatalogueType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';
import { getCatalogueTypesColumns } from '../../../../../utils/catalogueType/getCatalogueTypesColumns';
import { getCatalogueTypesFilterInput } from '../../../../../utils/catalogueType/getCatalogueTypesFilterInput';
import { getCatalogueTypesSortInput } from '../../../../../utils/catalogueType/getCatalogueTypesSortInput';
import { parseCatalogueTypeFormInputToCatalogueTypeInput } from '../../../../../utils/catalogueType/parseCatalogueTypeFormInput';

export default function CatalogueTypes() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CATALOGUE_CONFIG);
  const { t } = useTranslation();
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
  } = useTable<GetCatalogueTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetCatalogueTypesQuery({ pause, variables });
  const [, createCatalogueTypeMutation] = useCreateCatalogueTypeMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateCatalogueTypeDialogOpen, setCreateCatalogueTypeDialogOpen] = useState(false);
  const catalogueTypes = useMemo(() => queryState.data?.catalogueType.listCatalogueTypes, [queryState.data]);

  const handleOpenCreateCatalogueTypeDialog = useCallback(() => {
    setCreateCatalogueTypeDialogOpen(true);
  }, []);

  const handleCloseCreateCatalogueTypeDialog = useCallback(() => {
    setCreateCatalogueTypeDialogOpen(false);
  }, []);
  const handleSaveCreateCatalogueType = useCallback(
    async (catalogueType: CatalogueTypeFormInput) => {
      setLoading(true);
      const result = await createCatalogueTypeMutation({
        catalogueTypeInput: parseCatalogueTypeFormInputToCatalogueTypeInput(catalogueType),
      });
      setLoading(false);
      if (result.data?.catalogueType.add.isSuccess) {
        showSnackbar(t('catalogue_type.feedback.create'), 'success');
        handleCloseCreateCatalogueTypeDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.catalogueType.add.validationErrors);
      }
    },
    [t, createCatalogueTypeMutation, handleCloseCreateCatalogueTypeDialog, reexecuteQuery, showSnackbar, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('catalogue_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getCatalogueTypesColumns()}
          empty="catalogue_type.text.no_catalogue_types"
          initialState={initialState}
          rows={catalogueTypes?.nodes ?? []}
          totalCount={catalogueTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateCatalogueTypeDialog : undefined}
          onDelete={
            canDelete ? handleDelete('catalogue_type', DeleteCatalogueTypesDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/real-estate/catalogue-types/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportCatalogueTypesDocument) : undefined}
          onFilter={handleFilter(getCatalogueTypesFilterInput)}
          onPageChange={handlePageChange(catalogueTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getCatalogueTypesSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/real-estate/catalogue-types/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateCatalogueTypeDialogOpen && (
        <CatalogueTypeCreateDialog
          onClose={handleCloseCreateCatalogueTypeDialog}
          onSave={handleSaveCreateCatalogueType}
        />
      )}
    </Card>
  );
}
