import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { PriceListGeneralData } from '../../../../components/domains/PriceList/GeneralData/GeneralData';
import { PriceListArticlesTable } from '../../../../components/tables/PriceListArticles/PriceListArticles';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeletePriceListDocument,
  ExportPriceListsDocument,
  GetPriceListDocument,
  GetPriceListQuery,
  useUpdatePriceListMutation,
} from '../../../../gql/RealGimm.Web.PriceList.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { usePriceList } from '../../../../hooks/usePriceList';
import { PriceListFormInput } from '../../../../interfaces/FormInputs/PriceList';
import { parsePriceListFormInputToPriceListInput } from '../../../../utils/priceList/parsePriceListFormInput';
import { parsePriceListToPriceListFormInput } from '../../../../utils/priceList/parsePriceListFragment';
import { getPriceListSchema } from '../../../../utils/priceList/schemas/priceList';

export default function PriceList() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_PRICE_LIST_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/maintenance/price-lists');
  const { checkCanUseInternalCode } = usePriceList();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updatePriceListMutation] = useUpdatePriceListMutation();
  const [priceList, setPriceList] = useState<PriceListFormInput>();
  const debouncedPriceList = useDebounce(priceList);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchPriceList = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetPriceListQuery> = await client.query(GetPriceListDocument, {
      priceListId: Number(id),
    });
    setLoading(false);
    if (!result.data?.priceList.get) return Promise.reject();
    return parsePriceListToPriceListFormInput(result.data.priceList.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<PriceListFormInput>({
    defaultValues: fetchPriceList,
    resolver: priceList ? yupResolver(getPriceListSchema(canUseInternalCode, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedPriceList) {
      checkCanUseInternalCode(debouncedPriceList.internalCode, debouncedPriceList.priceListId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedPriceList?.internalCode, debouncedPriceList?.priceListId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setPriceList(formValues as PriceListFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(priceList);
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
    async (priceList: PriceListFormInput) => {
      setLoading(true);
      const result = await updatePriceListMutation({
        priceListId: Number(priceList.priceListId),
        input: parsePriceListFormInputToPriceListInput(priceList),
      });
      setLoading(false);
      if (result.data?.priceList.update.isSuccess) {
        showSnackbar(t('price_list.feedback.update'), 'success');
        setReadonly(true);
        const updatedPriceList = await fetchPriceList();
        setPriceList(updatedPriceList);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.priceList.update.validationErrors);
        return Promise.reject();
      }
    },
    [updatePriceListMutation, showSnackbar, t, fetchPriceList, showError],
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
          title={priceList ? `${priceList.internalCode} - ${priceList.name}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('price_list', DeletePriceListDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportPriceListsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'price_list.tab.general_data',
                children: priceList && <PriceListGeneralData control={control} errors={errors} readonly={readonly} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  priceList &&
                  !getPriceListSchema(canUseInternalCode, t).isValidSync(priceList),
              },
              {
                label: 'price_list.tab.price_list_articles',
                children: priceList && (
                  <TableProvider
                    key="price-list-articles"
                    initialState={{
                      sorting: [
                        {
                          desc: false,
                          id: 'internalCode',
                        },
                      ],
                    }}
                  >
                    <PriceListArticlesTable
                      priceList={{
                        ...priceList,
                        id: Number(id),
                      }}
                      readonly={!readonly}
                    />
                  </TableProvider>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
