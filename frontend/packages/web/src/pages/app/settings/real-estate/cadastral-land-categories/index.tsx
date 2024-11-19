import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CadastralLandCategoryDialog } from '../../../../../components/dialogs/CadastralLandCategory/CadastralLandCategory';
import { RawFeature } from '../../../../../enums/RawFeature';
import { CadastralLandCategoryFragment } from '../../../../../gql/RealGimm.Web.CadastralLandCategory.fragment';
import {
  DeleteCadastralLandCategoriesDocument,
  ExportCadastralLandCategoriesDocument,
  GetCadastralLandCategoriesQueryVariables,
  useAddCadastralLandCategoryMutation,
  useGetCadastralLandCategoriesQuery,
  useUpdateCadastralLandCategoryMutation,
} from '../../../../../gql/RealGimm.Web.CadastralLandCategory.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { CadastralLandCategoryFormInput } from '../../../../../interfaces/FormInputs/CadastralLandCategory';
import { getCadastralLandCategoriesColumns } from '../../../../../utils/cadastralLandCategory/getCadastralLandCategoriesColumns';
import { getCadastralLandCategoriesFilterInput } from '../../../../../utils/cadastralLandCategory/getCadastralLandCategoriesFilterInput';
import { getCadastralLandCategoriesSortInput } from '../../../../../utils/cadastralLandCategory/getCadastralLandCategoriesSortInput';
import { parseCadastralLandCategoryFormInputToCadastralLandCategoryInput } from '../../../../../utils/cadastralLandCategory/parseCadastralLandCategoryFormInput';
import { parseCadastralLandCategoryToCadastralLandCategoryFormInput } from '../../../../../utils/cadastralLandCategory/parseCadastralLandCategoryFragment';

export default function CadastralLandCategories() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CADASTRAL_LAND_CATEGORY);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
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
  } = useTable<GetCadastralLandCategoriesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetCadastralLandCategoriesQuery({ pause, variables });
  const [, createCadastralLandCategoryMutation] = useAddCadastralLandCategoryMutation();
  const [, updateCadastralLandCategoryMutation] = useUpdateCadastralLandCategoryMutation();
  const [loading, setLoading] = useState(false);
  const [cadastralLandCategoryDialogProps, setCadastralLandCategoryDialogProps] = useState<{
    input?: CadastralLandCategoryFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const cadastralLandCategories = useMemo(
    () => queryState.data?.cadastralLandCategory.cadastralLandCategories,
    [queryState.data],
  );

  const handleCloseCadastralLandCategoryDialog = useCallback(() => {
    setCadastralLandCategoryDialogProps({ open: false });
  }, []);

  const handleEditCadastralLandCategory = useCallback((row: CadastralLandCategoryFragment) => {
    setCadastralLandCategoryDialogProps({
      input: parseCadastralLandCategoryToCadastralLandCategoryFormInput(row),
      open: true,
    });
  }, []);

  const handleViewCadastralLandCategory = useCallback((row: CadastralLandCategoryFragment) => {
    setCadastralLandCategoryDialogProps({
      input: parseCadastralLandCategoryToCadastralLandCategoryFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveCadastralLandCategory = useCallback(
    async (value: CadastralLandCategoryFormInput) => {
      const saveCadastralLandCategory = async () => {
        if (value.cadastralLandCategoryId) {
          const result = await updateCadastralLandCategoryMutation({
            cadastralLandCategoryId: value.cadastralLandCategoryId,
            input: parseCadastralLandCategoryFormInputToCadastralLandCategoryInput(value),
          });
          return result.data?.cadastralLandCategory.update;
        } else {
          const result = await createCadastralLandCategoryMutation({
            input: parseCadastralLandCategoryFormInputToCadastralLandCategoryInput(value),
          });
          return result.data?.cadastralLandCategory.add;
        }
      };
      setLoading(true);
      const result = await saveCadastralLandCategory();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(`cadastral_land_category.feedback.${value.cadastralLandCategoryId ? 'update' : 'create'}`),
          'success',
        );
        handleCloseCadastralLandCategoryDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateCadastralLandCategoryMutation,
      createCadastralLandCategoryMutation,
      showSnackbar,
      t,
      handleCloseCadastralLandCategoryDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddCadastralLandCategory = useCallback(() => {
    setCadastralLandCategoryDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('cadastral_land_category.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getCadastralLandCategoriesColumns(language)}
          empty="cadastral_land_category.text.no_cadastral_land_categories"
          initialState={initialState}
          rows={cadastralLandCategories?.nodes ?? []}
          totalCount={cadastralLandCategories?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddCadastralLandCategory : undefined}
          onDelete={
            canDelete
              ? handleDelete('cadastral_land_category', DeleteCadastralLandCategoriesDocument, reexecuteQuery)
              : undefined
          }
          onEdit={canUpdate ? handleEditCadastralLandCategory : undefined}
          onExport={canRead ? handleExport('id', ExportCadastralLandCategoriesDocument) : undefined}
          onFilter={handleFilter(getCadastralLandCategoriesFilterInput)}
          onPageChange={handlePageChange(cadastralLandCategories?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getCadastralLandCategoriesSortInput)}
          onView={canRead ? handleViewCadastralLandCategory : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {cadastralLandCategoryDialogProps.open && (
        <CadastralLandCategoryDialog
          input={cadastralLandCategoryDialogProps.input}
          readonly={cadastralLandCategoryDialogProps.readonly}
          onClose={handleCloseCadastralLandCategoryDialog}
          onSave={handleSaveCadastralLandCategory}
        />
      )}
    </Card>
  );
}
