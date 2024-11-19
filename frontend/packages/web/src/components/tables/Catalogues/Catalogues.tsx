import { AddCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteCataloguesDocument,
  ExportCataloguesDocument,
  GetCataloguesQueryVariables,
  useCreateCataloguesMutation,
  useGetCataloguesQuery,
} from '../../../gql/RealGimm.Web.Catalogue.operation';
import { CatalogueFragment } from '../../../gql/RealGimm.Web.CatalogueOutput.fragment';
import { useCatalogue } from '../../../hooks/useCatalogue';
import { useFeature } from '../../../hooks/useFeature';
import { CatalogueFormInput } from '../../../interfaces/FormInputs/Catalogue';
import { getCataloguesColumns } from '../../../utils/catalogue/getCataloguesColumns';
import { parseCatalogueFormInputToCatalogueInput } from '../../../utils/catalogue/parseCatalogueFormInput';
import { CatalogueCreateDialog } from '../../wizards/Catalogue/Catalogue';
import { CataloguesTableProps } from './Catalogues.types';
import { CatalogueItemsDialog } from './Dialog/Dialog';

export const CataloguesTable = ({ estate, readonly }: CataloguesTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_ESTATE_CATALOGUE);
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
  } = useTable<GetCataloguesQueryVariables>((variables) => ({
    ...variables,
    ...(estate
      ? {
          where: {
            ...(variables.where ?? {}),
            estateId: {
              eq: estate.id,
            },
          },
        }
      : {}),
  }));
  const [queryState, reexecuteQuery] = useGetCataloguesQuery({ pause, variables });
  const [, createCataloguesMutation] = useCreateCataloguesMutation();
  const { addDocumentsAsync } = useCatalogue();
  const [loading, setLoading] = useState(false);
  const [isCreateCatalogueDialogOpen, setCreateCatalogueDialogOpen] = useState(false);
  const catalogues = useMemo(() => queryState.data?.catalogue.listCatalogues, [queryState.data]);
  const hasNoCatalogues = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (catalogues?.totalCount ?? 0) === 0,
    [catalogues, variables],
  );
  const [catalogueItemsDialogProps, setCatalogueItemsDialogProps] = useState<{
    estateId: number;
    catalogueTypeId: number;
  } | null>(null);

  const handleOpenCreateCatalogueDialog = useCallback(() => {
    setCreateCatalogueDialogOpen(true);
  }, []);

  const handleCloseCreateCatalogueDialog = useCallback(() => {
    setCreateCatalogueDialogOpen(false);
  }, []);
  const handleSaveCreateCatalogue = useCallback(
    async (catalogue: CatalogueFormInput) => {
      setLoading(true);
      const result = await createCataloguesMutation({
        catalogueInputs: parseCatalogueFormInputToCatalogueInput(catalogue),
      });
      setLoading(false);
      if (result.data?.catalogue.add.isSuccess) {
        showSnackbar(t('catalogue.feedback.create'), 'success');
        addDocumentsAsync(catalogue.catalogueType!.catalogueTypeId!, catalogue.estate!.id, catalogue.documents);
        handleCloseCreateCatalogueDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.catalogue.add.validationErrors);
      }
    },
    [
      createCataloguesMutation,
      showSnackbar,
      t,
      addDocumentsAsync,
      handleCloseCreateCatalogueDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const showAllButton = useCallback((row: CatalogueFragment) => {
    const onClick = (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setCatalogueItemsDialogProps({
        estateId: row.estateId,
        catalogueTypeId: row.catalogueTypeId,
      });
    };

    return (
      <Typography variant="link" onClick={onClick}>
        {row.catalogueTypeCount}
      </Typography>
    );
  }, []);

  const handleCloseCatalogueItemsDialog = useCallback(() => {
    setCatalogueItemsDialogProps(null);
  }, []);

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoCatalogues ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="estate.section_title.no_catalogue_items" />
      ) : (
        <PrimaryTable
          color={estate ? 'secondary' : 'primary'}
          columns={getCataloguesColumns(!estate, showAllButton)}
          empty="catalogue.text.no_catalogues"
          initialState={initialState}
          rows={catalogues?.nodes ?? []}
          rowActionsVariant={estate ? 'inline' : 'menu'}
          totalCount={catalogues?.totalCount ?? 0}
          useColumnVisibility={false}
          useRowSelection={!readonly}
          getRowId={({ catalogueTypeId, estateId }) => `${estateId}_${catalogueTypeId}`}
          onAdd={
            readonly || !canCreate
              ? undefined
              : estate
                ? {
                    color: 'secondary',
                    icon: <AddCircleOutline />,
                    label: 'estate.action.add_catalogue_item',
                    onClick: handleOpenCreateCatalogueDialog,
                  }
                : handleOpenCreateCatalogueDialog
          }
          onDelete={
            readonly || !canDelete
              ? undefined
              : handleDelete('catalogue', DeleteCataloguesDocument, reexecuteQuery, (rows) => ({
                  ids: Array.isArray(rows)
                    ? rows.map(({ catalogueTypeId, estateId }) => ({
                        catalogueTypeId,
                        estateId,
                      }))
                    : [{ catalogueTypeId: rows.catalogueTypeId, estateId: rows.estateId }],
                }))
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  navigate(`/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}`, {
                    state: { readonly: false },
                  });
                }
          }
          onExport={
            readonly || !canRead ? undefined : handleExport(['catalogueTypeId', 'estateId'], ExportCataloguesDocument)
          }
          onFilter={handleFilter()}
          onPageChange={handlePageChange(catalogues?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/real-estate/catalogues/${row.catalogueTypeId}/${row.estateId}`);
                }
              : undefined
          }
        />
      )}
      {catalogueItemsDialogProps && (
        <CatalogueItemsDialog
          catalogueTypeId={catalogueItemsDialogProps.catalogueTypeId}
          estateId={catalogueItemsDialogProps.estateId}
          onClose={handleCloseCatalogueItemsDialog}
        />
      )}
      {isCreateCatalogueDialogOpen && (
        <CatalogueCreateDialog
          estate={estate}
          onClose={handleCloseCreateCatalogueDialog}
          onSave={handleSaveCreateCatalogue}
        />
      )}
    </>
  );
};
