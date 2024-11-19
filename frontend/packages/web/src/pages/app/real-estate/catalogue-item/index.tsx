import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
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

import { CatalogueItemDocuments } from '../../../../components/domains/CatalogueItem/Documents/Documents';
import { CatalogueItemGeneralData } from '../../../../components/domains/CatalogueItem/GeneralData/GeneralData';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteCatalogueItemDocument,
  ExportCatalogueItemsDocument,
  GetCatalogueItemDocument,
  GetCatalogueItemQuery,
  useUpdateCatalogueItemMutation,
} from '../../../../gql/RealGimm.Web.CatalogueItem.operation';
import { useCatalogueItem } from '../../../../hooks/useCatalogueItem';
import { useFeature } from '../../../../hooks/useFeature';
import { CatalogueItemFormInput } from '../../../../interfaces/FormInputs/CatalogueItem';
import { parseCatalogueItemFormInputToCatalogueItemInput } from '../../../../utils/catalogueItem/parseCatalogueItemFormInput';
import { parseCatalogueItemToCatalogueItemFormInput } from '../../../../utils/catalogueItem/parseCatalogueItemFragment';
import { getCatalogueItemSchema } from '../../../../utils/catalogueItem/schemas/catalogueItem';
import { getCatalogueItemDocumentsSchema } from '../../../../utils/catalogueItem/schemas/documents';
import { getCatalogueItemGeneralDataSchema } from '../../../../utils/catalogueItem/schemas/generalData';

export default function CatalogueItem() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.ASST_ESTATE_CATALOGUE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { catalogueItemId, catalogueTypeId, estateId } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack(`/app/real-estate/catalogues/${catalogueTypeId}/${estateId}`);
  const { checkCanUseInternalCode } = useCatalogueItem();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateCatalogueItemMutation] = useUpdateCatalogueItemMutation();
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItemFormInput>();
  const debouncedCatalogueItem = useDebounce(catalogueItem);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchCatalogueItem = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCatalogueItemQuery> = await client.query(GetCatalogueItemDocument, {
      catalogueItemId: Number(catalogueItemId),
    });
    setLoading(false);
    if (!result.data?.catalogueItem.get) return Promise.reject();
    return parseCatalogueItemToCatalogueItemFormInput(result.data.catalogueItem.get);
  }, [catalogueItemId, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CatalogueItemFormInput>({
    defaultValues: fetchCatalogueItem,
    resolver: catalogueItem
      ? yupResolver(getCatalogueItemSchema({ [catalogueItem.guid]: canUseInternalCode }, language, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedCatalogueItem) {
      checkCanUseInternalCode(
        debouncedCatalogueItem.internalCode,
        debouncedCatalogueItem.catalogueItemId,
        [],
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedCatalogueItem?.internalCode, debouncedCatalogueItem?.catalogueItemId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCatalogueItem(formValues as CatalogueItemFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(catalogueItem);
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
    async (catalogueItem: CatalogueItemFormInput) => {
      setLoading(true);
      const result = await updateCatalogueItemMutation({
        catalogueItemInput: parseCatalogueItemFormInputToCatalogueItemInput(
          catalogueItem,
          Number(catalogueItem.catalogueType?.catalogueTypeId),
          Number(catalogueItem.estate?.id),
        ),
      });
      setLoading(false);
      if (result.data?.catalogueItem.update.isSuccess) {
        showSnackbar(t('catalogue_item.feedback.update'), 'success');
        setReadonly(true);
        const updatedCatalogueItem = await fetchCatalogueItem();
        setCatalogueItem(updatedCatalogueItem);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.catalogueItem.update.validationErrors);
      }
      return Promise.reject();
    },
    [t, updateCatalogueItemMutation, showSnackbar, fetchCatalogueItem, showError],
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
          title={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                {[
                  catalogueItem?.catalogueType?.category?.name,
                  catalogueItem?.catalogueType?.subCategory?.name,
                  catalogueItem?.catalogueType?.name,
                ]
                  .filter((it) => !!it)
                  .join(' - ')}
              </Typography>
              <Typography variant="h2">{catalogueItem?.internalCode}</Typography>
              <Typography variant="bodySm">
                {t('catalogue_item.field.estate')} {catalogueItem?.estate?.internalCode}
              </Typography>
            </Box>
          }
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('catalogue_item', DeleteCatalogueItemDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportCatalogueItemsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'catalogue_item.tab.general_data',
                children: catalogueItem && (
                  <CatalogueItemGeneralData control={control} errors={errors} readonly={readonly} setValue={setValue} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueItem &&
                  !getCatalogueItemGeneralDataSchema(
                    { [catalogueItem.guid]: canUseInternalCode },
                    language,
                    t,
                  ).isValidSync(catalogueItem),
              },
              {
                label: 'catalogue_item.tab.documents',
                children: catalogueItem && (
                  <CatalogueItemDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueItem &&
                  !getCatalogueItemDocumentsSchema(language, t).isValidSync(catalogueItem),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
