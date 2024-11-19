import { Button, Grid2 } from '@mui/material';
import {
  CurrencyField,
  DateField,
  EmptyText,
  PrimaryTable,
  SectionTitle,
  SelectField,
  TableMultiAdd,
  TextField,
} from '@realgimm5/frontend-common/components';
import { QuoteMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketQuoteArticleFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { TicketArticleCreateDialog } from '../../../wizards/TicketArticle/TicketArticle';
import { ArticleDialog } from './Article/Article';
import { ArticleDialogInput } from './Article/Article.types';
import { HistoryDialog } from './History/History';
import { TicketQuoteProps } from './Quote.types';

export const TicketQuote = ({ control, errors, isSupplier, readonly }: TicketQuoteProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const facilityContract = useWatch({ control, name: 'facilityContract' });
  const priceLists = useMemo(() => facilityContract?.priceLists ?? [], [facilityContract?.priceLists]);
  const { fields, append, remove, update } = useFieldArray({ control, name: 'quote.articles' });
  const history = useWatch({ control, name: 'quote.history' });
  const [isHistoryDialogOpen, setHistoryDialogOpen] = useState(false);
  const [isArticleCreateDialogOpen, setArticleCreateDialogOpen] = useState(false);
  const [articleDialogProps, setArticleDialogProps] = useState<{
    input?: ArticleDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseArticleDialog = useCallback(() => {
    setArticleDialogProps({ open: false });
  }, []);
  const handleEditArticle = useCallback(
    (row: TicketQuoteArticleFormInput) => {
      setArticleDialogProps({
        input: { article: row, index: fields.findIndex((it) => it.guid === row.guid) },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveArticle = useCallback(
    (value: TicketQuoteArticleFormInput[] | ArticleDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.article);
      }
      handleCloseArticleDialog();
    },
    [append, update, handleCloseArticleDialog],
  );

  const handleAddArticle = useCallback(() => {
    setArticleDialogProps({ open: true });
  }, []);

  const handleRemoveArticle = useCallback(
    (rows: TicketQuoteArticleFormInput | TicketQuoteArticleFormInput[]) => {
      const indexes = (Array.isArray(rows) ? rows : [rows]).map((row) =>
        fields.findIndex((it) => it.guid === row.guid),
      );
      remove(indexes);
    },
    [fields, remove],
  );

  const amount = useMemo(
    () => fields.reduce((acc, { quantity, unitPrice }) => acc + (quantity ?? 0) * (unitPrice ?? 0), 0),
    [fields],
  );
  const approvedAmount = useMemo(
    () =>
      fields.reduce(
        (acc, { isExcluded, quantity, unitPrice }) => acc + (isExcluded ? 0 : (quantity ?? 0) * (unitPrice ?? 0)),
        0,
      ),
    [fields],
  );

  const handleOpenHistoryDialog = useCallback(() => {
    setHistoryDialogOpen(true);
  }, []);
  const handleCloseHistoryDialog = useCallback(() => {
    setHistoryDialogOpen(false);
  }, []);

  const handleOpenArticleCreateDialog = useCallback(() => {
    setArticleCreateDialogOpen(true);
  }, []);
  const handleCloseArticleCreateDialog = useCallback(() => {
    setArticleCreateDialogOpen(false);
  }, []);
  const handleSaveArticles = useCallback(
    (articles: TicketQuoteArticleFormInput[]) => {
      append(articles);
    },
    [append],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isHistoryDialogOpen && <HistoryDialog history={history} onClose={handleCloseHistoryDialog} />}
      <SectionTitle
        actions={
          history.length !== 0 ? (
            <Button variant="text" onClick={handleOpenHistoryDialog}>
              {t('ticket.action.show_quote_history')}
            </Button>
          ) : undefined
        }
        value="ticket.section_title.resolution"
      />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.isFrameworkAgreement"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={[true, false]}
              getOptionLabel={(option) => t(`common.text.${option}`)}
              label={t('ticket.field.quote_framework_agreement')}
              error={!!errors.quote?.isFrameworkAgreement}
              helperText={errors.quote?.isFrameworkAgreement?.message}
              readonly={readonly}
              disabled={isSupplier}
              required={!isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.masterStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(QuoteMasterStatus)}
              getOptionLabel={(option) => t(`common.enum.quote_master_status.${option}`)}
              label={t('ticket.field.quote_status')}
              error={!!errors.quote?.masterStatus}
              helperText={errors.quote?.masterStatus?.message}
              readonly={readonly}
              disabled={isSupplier}
              required={!isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket.field.quote_external_code')}
              error={!!errors.quote?.externalCode}
              helperText={errors.quote?.externalCode?.message}
              readonly={readonly}
              disabled={!isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.classifications"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket.field.quote_classifications')}
              error={!!errors.quote?.classifications}
              helperText={errors.quote?.classifications?.message}
              readonly={readonly}
              disabled={isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CurrencyField value={amount} label={t('ticket.field.quote_amount')} readonly={readonly} disabled />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CurrencyField
          value={approvedAmount}
          label={t('ticket.field.quote_approved_amount')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.interventionDueDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('ticket.field.quote_due_date')}
              error={!!errors.quote?.interventionDueDate}
              helperText={errors.quote?.interventionDueDate?.message}
              readonly={readonly}
              disabled={isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="quote.orderNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket.field.quote_order_number')}
              error={!!errors.quote?.orderNumber}
              helperText={errors.quote?.orderNumber?.message}
              readonly={readonly}
              disabled={isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="quote.notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('ticket.field.quote_notes')}
              error={!!errors.quote?.notes}
              helperText={errors.quote?.notes?.message}
              readonly={readonly}
              disabled={isSupplier}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="ticket.section_title.quote_articles" />
      {articleDialogProps.open && (
        <ArticleDialog input={articleDialogProps.input} onClose={handleCloseArticleDialog} onSave={handleSaveArticle} />
      )}
      {isArticleCreateDialogOpen && (
        <TicketArticleCreateDialog
          priceLists={priceLists}
          onClose={handleCloseArticleCreateDialog}
          onSave={handleSaveArticles}
        />
      )}
      {fields.length === 0 && readonly ? (
        <EmptyText value="ticket.text.no_articles" />
      ) : (
        <PrimaryTable
          color="secondary"
          columns={[
            {
              id: 'internalCode',
              label: 'ticket.field.quote_article_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'name',
              label: 'ticket.field.quote_article_name',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'measurementUnit.name',
              label: 'ticket.field.quote_article_unit',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'unitPrice',
              type: 'currency',
              label: 'ticket.field.quote_article_price',
              enableColumnFilter: true,
              enableSorting: true,
            },
            {
              id: 'quantity',
              label: 'ticket.field.quote_article_quantity',
              getRowValue: (_, index) => (
                <Controller
                  key={`quote.articles.${index}.quantity`}
                  name={`quote.articles.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      sx={{ minWidth: '200px' }}
                      placeholder={t('contract.field.counterpart_since')}
                      error={!!errors.quote?.articles?.[index]?.quantity}
                      helperText={errors.quote?.articles?.[index]?.quantity?.message}
                      readonly={readonly}
                      required
                    />
                  )}
                />
              ),
            },
            {
              id: 'totalAmount',
              label: 'ticket.field.quote_article_total_amount',
              enableColumnFilter: true,
              enableSorting: true,
              getRowValue: (row) => parseNumberToCurrency((row.unitPrice ?? 0) * (row.quantity ?? 0), language),
            },
            {
              id: 'sourceArticle',
              label: 'ticket.field.quote_article_price_list',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => row.sourceArticle?.priceList.name ?? '-',
            },
            ...((!isSupplier && !readonly
              ? [
                  {
                    id: 'isExcluded',
                    label: 'common.component.table.actions',
                    sticky: 'right',
                    getRowValue: (_, index) => (
                      <Controller
                        key={`quote.articles.${index}.isExcluded`}
                        name={`quote.articles.${index}.isExcluded`}
                        control={control}
                        render={({ field }) => (
                          <Button
                            color="secondary"
                            size="small"
                            variant={field.value ? 'outlined' : 'contained'}
                            onClick={() => {
                              field.onChange(!field.value);
                            }}
                          >
                            {t(`core.button.${field.value ? 'include' : 'exclude'}`)}
                          </Button>
                        )}
                      />
                    ),
                  },
                ]
              : []) as TableColumn<TicketQuoteArticleFormInput>[]),
          ]}
          rowActionsVariant="inline"
          rows={fields}
          totalCount={fields.length}
          onAdd={
            isSupplier && !readonly
              ? {
                  actions: [
                    {
                      label: 'ticket.action.add_new_articles',
                      onClick: handleAddArticle,
                    },
                    ...((priceLists.length === 0
                      ? []
                      : [
                          {
                            label: 'ticket.action.add_price_list_articles',
                            onClick: handleOpenArticleCreateDialog,
                          },
                        ]) as TableMultiAdd),
                  ],
                  color: 'secondary',
                  label: 'ticket.action.add_articles',
                }
              : undefined
          }
          onDelete={isSupplier && !readonly ? handleRemoveArticle : undefined}
          onEdit={isSupplier && !readonly ? handleEditArticle : undefined}
          getRowId={(row) => row.guid}
          useColumnVisibility={false}
          useRowSelection={false}
          useSelectedRows={false}
        />
      )}
    </Grid2>
  );
};
