import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { CatalogueActivities } from '../../../../components/domains/Catalogue/Activities/Activities';
import { CatalogueDocuments } from '../../../../components/domains/Catalogue/Documents/Documents';
import { CatalogueEstate } from '../../../../components/domains/Catalogue/Estate/Estate';
import { CatalogueItems } from '../../../../components/domains/Catalogue/Items/Items';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteCatalogueDocument,
  ExportCataloguesDocument,
  GetCatalogueDocument,
  GetCatalogueQuery,
  useUpdateCatalogueMutation,
} from '../../../../gql/RealGimm.Web.Catalogue.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';
import { parseCatalogueFormInputToCatalogueInput } from '../../../../utils/catalogue/parseCatalogueFormInput';
import { parseCatalogueToCatalogueFormInput } from '../../../../utils/catalogue/parseCatalogueFragment';
import { getCatalogueSchema } from '../../../../utils/catalogue/schemas/catalogue';
import { getCatalogueDocumentsSchema } from '../../../../utils/catalogue/schemas/documents';
import { getCatalogueItemsSchema } from '../../../../utils/catalogue/schemas/items';

export default function Catalogue() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.ASST_ESTATE_CATALOGUE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { catalogueTypeId, estateId } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/real-estate/catalogues');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateCatalogueMutation] = useUpdateCatalogueMutation();
  const [catalogue, setCatalogue] = useState<CatalogueFormInput>();
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchCatalogue = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCatalogueQuery> = await client.query(GetCatalogueDocument, {
      catalogueTypeId: Number(catalogueTypeId),
      estateId: Number(estateId),
    });
    setLoading(false);
    if (!result.data?.catalogue.get) return Promise.reject();
    const catalogue = parseCatalogueToCatalogueFormInput(result.data.catalogue.get);
    if (catalogue.items.length === 0) {
      goBack();
    }

    return catalogue;
  }, [catalogueTypeId, estateId, client, goBack]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CatalogueFormInput>({
    defaultValues: fetchCatalogue,
    resolver: catalogue ? yupResolver(getCatalogueSchema(canUseInternalCodes, language, t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCatalogue(formValues as CatalogueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(catalogue);
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
    async (catalogue: CatalogueFormInput) => {
      if (catalogue.items.length === 0) {
        handleDelete('catalogue', DeleteCatalogueDocument, goBack)();
        return;
      }
      setLoading(true);
      const result = await updateCatalogueMutation({
        catalogueTypeId: Number(catalogue.catalogueType?.catalogueTypeId),
        estateId: Number(catalogue.estate?.id),
        catalogueInputs: parseCatalogueFormInputToCatalogueInput(catalogue),
      });
      setLoading(false);
      if (result.data?.catalogue.update.isSuccess) {
        showSnackbar(t('catalogue.feedback.update'), 'success');
        setReadonly(true);
        const updatedCatalogue = await fetchCatalogue();
        setCatalogue(updatedCatalogue);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.catalogue.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateCatalogueMutation, handleDelete, goBack, showSnackbar, t, fetchCatalogue, showError],
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
                {[catalogue?.category?.name, catalogue?.subCategory?.name].filter((it) => !!it).join(' - ')}
              </Typography>
              <Typography variant="h2">{catalogue?.catalogueType?.name}</Typography>
              <Typography variant="bodySm">
                {t('catalogue.field.estate')} {catalogue?.estate?.internalCode}
              </Typography>
            </Box>
          }
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('catalogue', DeleteCatalogueDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportCataloguesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'catalogue.tab.items',
                children: catalogue && (
                  <CatalogueItems
                    canUseInternalCodes={canUseInternalCodes}
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setCanUseInternalCodes={setCanUseInternalCodes}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogue &&
                  !getCatalogueItemsSchema(canUseInternalCodes, language, t).isValidSync(catalogue),
              },
              {
                label: 'catalogue.tab.activities',
                children: catalogue && <CatalogueActivities control={control} readonly={readonly} />,
              },
              {
                label: 'catalogue.tab.estate',
                children: catalogue && <CatalogueEstate control={control} mode={FormMode.Edit} readonly={readonly} />,
              },
              {
                label: 'catalogue.tab.documents',
                children: catalogue && (
                  <CatalogueDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogue &&
                  !getCatalogueDocumentsSchema(language, t).isValidSync(catalogue),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
