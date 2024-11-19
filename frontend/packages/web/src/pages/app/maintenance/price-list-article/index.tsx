import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { PriceListArticleCatalogueTypes } from '../../../../components/domains/PriceListArticle/CatalogueTypes/CatalogueTypes';
import { PriceListArticleGeneralData } from '../../../../components/domains/PriceListArticle/GeneralData/GeneralData';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeletePriceListArticleDocument,
  ExportPriceListArticlesDocument,
  GetPriceListArticleDocument,
  GetPriceListArticleQuery,
  useUpdatePriceListArticleMutation,
} from '../../../../gql/RealGimm.Web.PriceListArticle.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { usePriceListArticle } from '../../../../hooks/usePriceListArticle';
import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';
import { parsePriceListArticleFormInputToPriceListArticleInput } from '../../../../utils/priceListArticle/parsePriceListArticleFormInput';
import { parsePriceListArticleToPriceListArticleFormInput } from '../../../../utils/priceListArticle/parsePriceListArticleFragment';
import { getPriceListArticleCatalogueTypesSchema } from '../../../../utils/priceListArticle/schemas/catalogueTypes';
import { getPriceListArticleGeneralDataSchema } from '../../../../utils/priceListArticle/schemas/generalData';
import { getPriceListArticleSchema } from '../../../../utils/priceListArticle/schemas/priceListArticle';

export default function PriceListArticle() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_PRICE_LIST_ARTICLES);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/maintenance/price-list-articles');
  const { checkCanUseInternalCode } = usePriceListArticle();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updatePriceListArticleMutation] = useUpdatePriceListArticleMutation();
  const [priceListArticle, setPriceListArticle] = useState<PriceListArticleFormInput>();
  const debouncedPriceListArticle = useDebounce(priceListArticle);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchPriceListArticle = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetPriceListArticleQuery> = await client.query(GetPriceListArticleDocument, {
      priceListArticleId: Number(id),
    });
    setLoading(false);
    if (!result.data?.priceListArticle.get) return Promise.reject();
    return parsePriceListArticleToPriceListArticleFormInput(result.data.priceListArticle.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<PriceListArticleFormInput>({
    defaultValues: fetchPriceListArticle,
    resolver: priceListArticle
      ? yupResolver(getPriceListArticleSchema(canUseInternalCode, language, FormMode.Edit, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedPriceListArticle) {
      checkCanUseInternalCode(
        debouncedPriceListArticle.internalCode,
        debouncedPriceListArticle.priceListArticleId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedPriceListArticle?.internalCode, debouncedPriceListArticle?.priceListArticleId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setPriceListArticle(formValues as PriceListArticleFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(priceListArticle);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (priceListArticle: PriceListArticleFormInput) => {
      setLoading(true);
      const result = await updatePriceListArticleMutation({
        priceListArticleId: Number(priceListArticle.priceListArticleId),
        input: parsePriceListArticleFormInputToPriceListArticleInput(priceListArticle, FormMode.Edit),
      });
      setLoading(false);
      if (result.data?.priceListArticle.update.isSuccess) {
        showSnackbar(t('price_list_article.feedback.update'), 'success');
        setReadonly(true);
        const updatedPriceListArticle = await fetchPriceListArticle();
        setPriceListArticle(updatedPriceListArticle);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.priceListArticle.update.validationErrors);
        return Promise.reject();
      }
    },
    [updatePriceListArticleMutation, showSnackbar, t, fetchPriceListArticle, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={priceListArticle ? `${priceListArticle.internalCode} - ${priceListArticle.name}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('price_list_article', DeletePriceListArticleDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportPriceListArticlesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'price_list_article.tab.general_data',
                children: priceListArticle && (
                  <PriceListArticleGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    usePriceList
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  priceListArticle &&
                  !getPriceListArticleGeneralDataSchema(canUseInternalCode, language, FormMode.Edit, t).isValidSync(
                    priceListArticle,
                  ),
              },
              {
                label: 'price_list_article.tab.catalogue_types',
                children: priceListArticle && (
                  <PriceListArticleCatalogueTypes control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  priceListArticle &&
                  !getPriceListArticleCatalogueTypesSchema(t).isValidSync(priceListArticle),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
