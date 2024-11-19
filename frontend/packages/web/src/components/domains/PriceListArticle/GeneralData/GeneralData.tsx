import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  Alert,
  CurrencyField,
  DateField,
  SecondaryTable,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListArticlePricePeriodFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';
import { PriceListField } from '../../../core/Fields/PriceList/PriceList';
import { PriceListMeasurementUnitField } from '../../../core/Fields/PriceListMeasurementUnit/PriceListMeasurementUnit';
import { PricePeriodDialog } from './Dialog/Dialog';
import { PricePeriodDialogInput } from './Dialog/Dialog.types';
import { PriceListArticleGeneralDataProps } from './GeneralData.types';

export const PriceListArticleGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  usePriceList,
}: PriceListArticleGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'pricePeriods' });
  const [pricePeriodDialogProps, setPricePeriodDialogProps] = useState<{
    input?: PricePeriodDialogInput;
    open: boolean;
  }>({ open: false });

  const actualPrice = useMemo(() => fields.find(({ until }) => until === null)?.price, [fields]);
  const pricePeriods = useMemo(
    () => fields.filter((_, idx) => idx !== pricePeriodDialogProps.input?.index),
    [fields, pricePeriodDialogProps.input?.index],
  );

  const handleClosePricePeriodDialog = useCallback(() => {
    setPricePeriodDialogProps({ open: false });
  }, []);
  const handleEditPricePeriod = useCallback(
    (index: number) => {
      setPricePeriodDialogProps({
        input: { pricePeriod: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSavePricePeriod = useCallback(
    (value: PriceListArticlePricePeriodFormInput | PricePeriodDialogInput) => {
      if ('index' in value) {
        update(value.index, value.pricePeriod);
      } else {
        append(value);
      }
      handleClosePricePeriodDialog();
    },
    [append, update, handleClosePricePeriodDialog],
  );

  const handleAddPricePeriod = useCallback(() => {
    setPricePeriodDialogProps({ open: true });
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="price_list_article.section_title.general_data" />
      {usePriceList && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="priceList"
            control={control}
            render={({ field }) => (
              <PriceListField
                {...field}
                label={t('price_list_article.field.price_list')}
                error={!!errors.priceList}
                helperText={errors.priceList?.message}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: usePriceList ? 4 : 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('price_list_article.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: usePriceList ? 4 : 6 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('price_list_article.field.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="since"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('price_list_article.field.date_since')}
                error={!!errors.since}
                helperText={errors.since?.message}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 6 }}>
        <Controller
          name="measurementUnit"
          control={control}
          render={({ field }) => (
            <PriceListMeasurementUnitField
              {...field}
              label={t('price_list_article.field.measurement_unit')}
              error={!!errors.measurementUnit}
              helperText={errors.measurementUnit?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create ? (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CurrencyField
                {...field}
                label={t('price_list_article.field.price')}
                error={!!errors.price}
                helperText={errors.price?.message}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CurrencyField
              value={actualPrice}
              label={t('price_list_article.field.actual_price')}
              readonly={readonly}
              disabled
            />
          </Grid2>
          <SectionTitle
            actions={
              readonly ? undefined : (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddPricePeriod}
                >
                  {t('price_list_article.action.add_price_period')}
                </Button>
              )
            }
            value="price_list_article.section_title.price_periods"
          />
          {pricePeriodDialogProps.open && (
            <PricePeriodDialog
              input={pricePeriodDialogProps.input}
              pricePeriods={pricePeriods}
              onClose={handleClosePricePeriodDialog}
              onSave={handleSavePricePeriod}
            />
          )}
          {errors.pricePeriods?.message && (
            <Grid2 size={12}>
              <Alert severity="error" message={errors.pricePeriods.message} />
            </Grid2>
          )}
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'price_list_article.field.date_since',
                'price_list_article.field.date_until',
                'price_list_article.field.price',
              ]}
              rows={fields.map((entry) => [entry.since, entry.until, parseNumberToCurrency(entry.price, language)])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditPricePeriod}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
