import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CatalogueCategorySubCategoriesDialog } from '../../../../../components/dialogs/CatalogueCategory/SubCategories/SubCategories';
import { CatalogueCategoryCreateDialog } from '../../../../../components/wizards/CatalogueCategory/CatalogueCategory';
import { RawFeature } from '../../../../../enums/RawFeature';
import { CatalogueCategoryFragment } from '../../../../../gql/RealGimm.Web.CatalogueCategory.fragment';
import {
  DeleteCatalogueCategoriesDocument,
  GetCatalogueCategoriesQueryVariables,
  useCreateCatalogueCategoryMutation,
  useGetCatalogueCategoriesQuery,
} from '../../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { CatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';
import { getCatalogueCategoriesColumns } from '../../../../../utils/catalogueCategory/getCatalogueCategoriesColumns';
import { getCatalogueCategoriesFilterInput } from '../../../../../utils/catalogueCategory/getCatalogueCategoriesFilterInput';
import { parseCatalogueCategoryFormInputToCatalogueCategoryInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFormInput';
import { parseCatalogueCategoryToCatalogueCategoryFormInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFragment';

export default function CatalogueCategories() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CATALOGUE_CONFIG);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetCatalogueCategoriesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetCatalogueCategoriesQuery({ pause, variables });
  const [, createCatalogueCategoryMutation] = useCreateCatalogueCategoryMutation();
  const [loading, setLoading] = useState(false);
  const [catalogueCategoriesSubCategoriesDialogProps, setCatalogueCategoriesSubCategoriesDialogProps] =
    useState<CatalogueCategoryFormInput | null>(null);
  const [isCreateCatalogueCategoryDialogProps, setIsCreateCatalogueCategoryDialogProps] = useState(false);
  const catalogueCategories = useMemo(
    () => queryState.data?.catalogueCategory.listCatalogueCategories,
    [queryState.data],
  );

  const handleCloseCatalogueCategoryDialog = useCallback(() => {
    setIsCreateCatalogueCategoryDialogProps(false);
  }, []);

  const handleSaveCatalogueCategory = useCallback(
    async (value: CatalogueCategoryFormInput) => {
      setLoading(true);
      const result = await createCatalogueCategoryMutation({
        input: parseCatalogueCategoryFormInputToCatalogueCategoryInput(value),
      });
      setLoading(false);
      if (result.data?.catalogueCategory.add.isSuccess) {
        showSnackbar(t('catalogue_category.feedback.create.single'), 'success');
        handleCloseCatalogueCategoryDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.catalogueCategory.add.validationErrors);
      }
    },
    [t, createCatalogueCategoryMutation, handleCloseCatalogueCategoryDialog, showError, showSnackbar, reexecuteQuery],
  );

  const handleAddCatalogueCategory = useCallback(() => {
    setIsCreateCatalogueCategoryDialogProps(true);
  }, []);

  const showAllButton = useCallback(
    (row: CatalogueCategoryFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setCatalogueCategoriesSubCategoriesDialogProps(parseCatalogueCategoryToCatalogueCategoryFormInput(row));
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseCatalogueCategorySubCategoriesDialog = useCallback(() => {
    setCatalogueCategoriesSubCategoriesDialogProps(null);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('catalogue_category.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getCatalogueCategoriesColumns(showAllButton)}
          empty="catalogue_category.text.no_catalogue_categories"
          initialState={initialState}
          rows={catalogueCategories?.nodes ?? []}
          totalCount={catalogueCategories?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddCatalogueCategory : undefined}
          onDelete={
            canDelete
              ? handleDelete('catalogue_category', DeleteCatalogueCategoriesDocument, reexecuteQuery)
              : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/real-estate/catalogue-categories/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onFilter={handleFilter(getCatalogueCategoriesFilterInput)}
          onPageChange={handlePageChange(catalogueCategories?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/real-estate/catalogue-categories/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {catalogueCategoriesSubCategoriesDialogProps && (
        <CatalogueCategorySubCategoriesDialog
          input={catalogueCategoriesSubCategoriesDialogProps}
          mode={FormMode.Edit}
          readonly
          useSubCategories
          onClose={handleCloseCatalogueCategorySubCategoriesDialog}
        />
      )}
      {isCreateCatalogueCategoryDialogProps && (
        <CatalogueCategoryCreateDialog
          onSave={handleSaveCatalogueCategory}
          onClose={handleCloseCatalogueCategoryDialog}
        />
      )}
    </Card>
  );
}
