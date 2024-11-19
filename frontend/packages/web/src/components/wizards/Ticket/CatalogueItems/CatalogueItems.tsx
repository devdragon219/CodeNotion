import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllCatalogueItemsQuery } from '../../../../gql/RealGimm.Web.CatalogueItem.operation';
import { CatalogueItemRow } from '../../../../interfaces/FormInputs/CatalogueItem';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { groupCatalogueItems } from '../../../../utils/catalogueItem/groupCatalogueItems';
import { getTicketCatalogueItemsSchema } from '../../../../utils/ticket/schemas/catalogueItems';
import { TicketCatalogueItemsStepProps } from './CatalogueItems.types';

export const TicketCatalogueItemsStep = ({
  ticket,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketCatalogueItemsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketCatalogueItemsSchema(t)),
  });
  const [queryState] = useGetAllCatalogueItemsQuery({
    variables: {
      where: {
        catalogueType: {
          id: {
            eq: ticket.ticketChecklist?.catalogueType.id,
          },
        },
        estate: {
          id: {
            eq: ticket.locationEstateUnit?.estate.id,
          },
        },
      },
    },
  });
  const catalogueItems = useMemo(
    () => groupCatalogueItems(queryState.data?.catalogueItem.listCatalogueItemsFull ?? []),
    [queryState.data],
  );

  const getRowId = useCallback((row: CatalogueItemRow) => String(row.id), []);
  const getSubRows = useCallback((row: CatalogueItemRow) => row.subRows, []);

  const handleRowsSelected = useCallback(
    (onChange: (rows: CatalogueItemRow[]) => void) => (rows: CatalogueItemRow[]) => {
      onChange(rows.filter(({ id }) => typeof id === 'number'));
    },
    [],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.catalogueItems) {
      onError(errors.catalogueItems.message);
    }
    // eslint-disable-next-line
  }, [errors.catalogueItems]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="ticket.section_title.catalogue_items" />
        <Grid2 size={12}>
          <Controller
            name="catalogueItems"
            control={control}
            render={({ field }) => (
              <PrimaryTable
                color="secondary"
                columns={[
                  {
                    id: 'categoryName',
                    label: 'ticket.field.catalogue_category',
                    getCanSelect: (depth) => depth === 0,
                    getCanExpand: (depth) => depth === 0,
                    getRowValue: (row) =>
                      typeof row.id === 'string' && row.id.startsWith('CO') ? row.catalogueType.category.name : '',
                  },
                  {
                    id: 'subCategoryName',
                    label: 'ticket.field.catalogue_subcategory',
                    getCanSelect: (depth) => depth === 1,
                    getCanExpand: (depth) => depth === 1,
                    getRowValue: (row) =>
                      typeof row.id === 'string' && row.id.startsWith('SC')
                        ? (row.catalogueType.subCategory?.name ?? '')
                        : '',
                  },
                  {
                    id: 'typeName',
                    label: 'ticket.field.catalogue_type',
                    getCanSelect: (depth) => depth === 2,
                    getCanExpand: (depth) => depth === 2,
                    getRowValue: (row) =>
                      typeof row.id === 'string' && row.id.startsWith('TO') ? row.catalogueType.name : '',
                  },
                  {
                    id: 'internalCode',
                    label: 'ticket.field.catalogue_item',
                    getCanSelect: (depth) => depth === 3,
                  },
                ]}
                empty="ticket.text.no_catalogue_items"
                initialState={{
                  rowSelection: field.value.reduce(
                    (acc, it) => ({
                      ...acc,
                      [it.id]: true,
                    }),
                    {},
                  ),
                }}
                rows={catalogueItems}
                getRowId={getRowId}
                getSubRows={getSubRows}
                onRowsSelected={handleRowsSelected(field.onChange)}
                useColumnVisibility={false}
                usePagination={false}
                useRowActions={false}
                useRowSelection={false}
                useSelectedRows={false}
                useRowExpandCollapse
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
