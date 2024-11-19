import { Grid2 } from '@mui/material';
import { Alert, Loader, TransferList } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { useGetAllCatalogueTypesQuery } from '../../../../../gql/RealGimm.Web.CatalogueType.operation';
import { PriceListArticleCatalogueTypesTransferListProps } from './TransferList.types';

export const PriceListArticleCatalogueTypesTransferList = ({
  control,
  errors,
  mode,
  where,
}: PriceListArticleCatalogueTypesTransferListProps) => {
  const [queryState] = useGetAllCatalogueTypesQuery({
    variables: {
      where,
    },
  });
  const catalogueTypes = useMemo(
    () =>
      queryState.data?.catalogueType.listCatalogueTypesFull.map((row) => ({
        catalogueTypeId: row.id,
        categoryName: row.category.name,
        name: row.name,
        subCategoryName: row.subCategory?.name ?? '',
      })) ?? [],
    [queryState.data],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      {queryState.fetching && <Loader />}
      {mode === FormMode.Edit && errors.catalogueTypes?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.catalogueTypes.message} />
        </Grid2>
      )}
      <Grid2 size={12} sx={{ height: { xs: 'calc(100% - 40px)', sm: 'calc(100% - 48px)' } }}>
        <Controller
          name="catalogueTypes"
          control={control}
          render={({ field }) => (
            <TransferList
              {...field}
              columns={[
                {
                  id: 'categoryName',
                  label: 'price_list_article.field.catalogue_category',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'subCategoryName',
                  label: 'price_list_article.field.catalogue_subcategory',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'name',
                  label: 'price_list_article.field.catalogue_type',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
              ]}
              empty="price_list_article.text.no_catalogue_types"
              rows={catalogueTypes}
              titles={{
                left: 'price_list_article.section_title.select_catalogue_types',
                right: 'price_list_article.section_title.selected_catalogue_types',
              }}
              getRowId={({ catalogueTypeId }) => String(catalogueTypeId)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
