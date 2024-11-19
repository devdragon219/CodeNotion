import { Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import { PriceListArticleFragment } from '../../../gql/RealGimm.Web.PriceListArticle.fragment';
import {
  DeletePriceListArticlesDocument,
  ExportPriceListArticlesDocument,
  GetPriceListArticlesQueryVariables,
  useAddPriceListArticleMutation,
  useGetPriceListArticlesQuery,
  useImportPriceListArticlesMutation,
} from '../../../gql/RealGimm.Web.PriceListArticle.operation';
import { useFeature } from '../../../hooks/useFeature';
import { PriceListArticleFormInput } from '../../../interfaces/FormInputs/PriceListArticle';
import { getPriceListArticlesColumns } from '../../../utils/priceListArticle/getPriceListArticlesColumns';
import { parsePriceListArticleFormInputToPriceListArticleInput } from '../../../utils/priceListArticle/parsePriceListArticleFormInput';
import { PriceListArticlesCreateDialog } from '../../dialogs/PriceListArticles/PriceListArticles';
import { PriceListArticleCreateDialog } from '../../wizards/PriceListArticle/PriceListArticle';
import { CatalogueTypesDialog } from './Dialog/Dialog';
import { PriceListArticlesTableProps } from './PriceListArticles.types';

export const PriceListArticlesTable = ({ outstanding, priceList, readonly }: PriceListArticlesTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_PRICE_LIST_ARTICLES);
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
  } = useTable<GetPriceListArticlesQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(priceList
        ? {
            priceList: {
              id: {
                eq: priceList.id,
              },
            },
          }
        : {}),
      ...(outstanding
        ? {
            actualPriceUntil: {
              eq: null,
            },
          }
        : {}),
    },
  }));
  const [queryState, reexecuteQuery] = useGetPriceListArticlesQuery({ pause, variables });
  const [, createPriceListArticleMutation] = useAddPriceListArticleMutation();
  const [, importPriceListArticlesMutation] = useImportPriceListArticlesMutation();
  const [loading, setLoading] = useState(false);
  const [catalogueTypesDialogProps, setCatalogueTypesDialogProps] = useState<PriceListArticleFragment | null>(null);
  const [isCreatePriceListArticleDialogOpen, setCreatePriceListArticleDialogOpen] = useState(false);
  const [isCreatePriceListArticlesDialogOpen, setCreatePriceListArticlesDialogOpen] = useState(false);
  const priceListArticles = useMemo(() => queryState.data?.priceListArticle.listPriceListArticles, [queryState.data]);
  const hasNoPriceListArticles = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (priceListArticles?.totalCount ?? 0) === 0,
    [priceListArticles, variables],
  );

  const handleOpenCreatePriceListArticleDialog = useCallback(() => {
    setCreatePriceListArticleDialogOpen(true);
  }, []);

  const handleCloseCreatePriceListArticleDialog = useCallback(() => {
    setCreatePriceListArticleDialogOpen(false);
  }, []);
  const handleSaveCreatePriceListArticle = useCallback(
    async (priceListArticle: PriceListArticleFormInput) => {
      setLoading(true);
      const result = await createPriceListArticleMutation({
        input: parsePriceListArticleFormInputToPriceListArticleInput(priceListArticle, FormMode.Create),
      });
      setLoading(false);
      if (result.data?.priceListArticle.add.isSuccess) {
        showSnackbar(t('price_list_article.feedback.create'), 'success');
        handleCloseCreatePriceListArticleDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.priceListArticle.add.validationErrors);
      }
    },
    [
      t,
      createPriceListArticleMutation,
      handleCloseCreatePriceListArticleDialog,
      reexecuteQuery,
      showSnackbar,
      showError,
    ],
  );

  const handleOpenCreatePriceListArticlesDialog = useCallback(() => {
    setCreatePriceListArticlesDialogOpen(true);
  }, []);

  const handleCloseCreatePriceListArticlesDialog = useCallback(() => {
    setCreatePriceListArticlesDialogOpen(false);
  }, []);
  const handleSaveCreatePriceListArticles = useCallback(
    async (document: DocumentFormInput) => {
      setLoading(true);
      const result = await importPriceListArticlesMutation({
        file: document.content!,
      });
      setLoading(false);
      if (result.data?.priceListArticle.importFromExcel.isSuccess) {
        showSnackbar(
          t('price_list_article.feedback.import', {
            amount: result.data.priceListArticle.importFromExcel.value,
          }),
          'success',
        );
        handleCloseCreatePriceListArticlesDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.priceListArticle.importFromExcel.validationErrors);
      }
    },
    [
      importPriceListArticlesMutation,
      showSnackbar,
      t,
      handleCloseCreatePriceListArticlesDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const showAllButton = useCallback(
    (row: PriceListArticleFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setCatalogueTypesDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseCatalogueTypesDialog = useCallback(() => {
    setCatalogueTypesDialogProps(null);
  }, []);

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoPriceListArticles ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="price_list.section_title.no_price_list_articles" />
      ) : (
        <PrimaryTable
          columns={getPriceListArticlesColumns(showAllButton, { usePriceList: !priceList, useUntil: !outstanding })}
          empty="price_list_article.text.no_price_list_articles"
          initialState={initialState}
          rows={priceListArticles?.nodes ?? []}
          rowActionsVariant={priceList ? 'inline' : 'menu'}
          totalCount={priceListArticles?.totalCount ?? 0}
          useRowSelection={!readonly}
          useColumnVisibility={false}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate
              ? undefined
              : {
                  actions: [
                    {
                      color: 'secondary',
                      label: 'price_list_article.action.add_single_article',
                      onClick: handleOpenCreatePriceListArticleDialog,
                    },
                    {
                      color: 'secondary',
                      label: 'price_list_article.action.add_multiple_articles',
                      onClick: handleOpenCreatePriceListArticlesDialog,
                    },
                  ],
                  color: priceList ? 'secondary' : 'primary',
                  label: 'common.button.add',
                }
          }
          onDelete={
            readonly || !canDelete
              ? undefined
              : handleDelete('price_list_article', DeletePriceListArticlesDocument, reexecuteQuery)
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  navigate(`/app/maintenance/price-list-articles/${row.id}`, { state: { readonly: false } });
                }
          }
          onExport={readonly || !canRead ? undefined : handleExport('id', ExportPriceListArticlesDocument)}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(priceListArticles?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/maintenance/price-list-articles/${row.id}`);
                }
              : undefined
          }
        />
      )}
      {catalogueTypesDialogProps && (
        <CatalogueTypesDialog
          catalogueTypes={catalogueTypesDialogProps.catalogueTypes}
          onClose={handleCloseCatalogueTypesDialog}
        />
      )}
      {isCreatePriceListArticleDialogOpen && (
        <PriceListArticleCreateDialog
          priceList={priceList}
          onClose={handleCloseCreatePriceListArticleDialog}
          onSave={handleSaveCreatePriceListArticle}
        />
      )}
      {isCreatePriceListArticlesDialogOpen && (
        <PriceListArticlesCreateDialog
          onClose={handleCloseCreatePriceListArticlesDialog}
          onSave={handleSaveCreatePriceListArticles}
        />
      )}
    </>
  );
};
