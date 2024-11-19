import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CurrencyField,
  DateField,
  Dialog,
  DialogContent,
  Form,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListArticlePricePeriodFormInput } from '../../../../../interfaces/FormInputs/PriceListArticle';
import { getEmptyPriceListArticlePricePeriodFormInput } from '../../../../../utils/priceListArticle/initialValues';
import { getPriceListArticlePricePeriodSchema } from '../../../../../utils/priceListArticle/schemas/generalData';
import { PricePeriodDialogProps } from './Dialog.types';

export const PricePeriodDialog = ({ input, pricePeriods, onClose, onSave }: PricePeriodDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PriceListArticlePricePeriodFormInput>({
    defaultValues: input ? input.pricePeriod : getEmptyPriceListArticlePricePeriodFormInput(),
    resolver: yupResolver(getPriceListArticlePricePeriodSchema(language, pricePeriods, t)),
  });

  const onSubmit = useCallback(
    (formValues: PriceListArticlePricePeriodFormInput) => {
      onSave(
        input
          ? {
              ...input,
              pricePeriod: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`price_list_article.dialog.${input ? 'edit' : 'add'}_price_period`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="price_list_article.section_title.price_period" />
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
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="until"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('price_list_article.field.date_until')}
                    error={!!errors.until}
                    helperText={errors.until?.message}
                  />
                )}
              />
            </Grid2>
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
                    required
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
