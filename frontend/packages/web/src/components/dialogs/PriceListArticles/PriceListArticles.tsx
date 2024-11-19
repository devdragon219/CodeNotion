import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline, SaveAltRounded } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CloseDialog,
  Dialog,
  DialogContent,
  DocumentField,
  Form,
  Loader,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { FileType } from '@realgimm5/frontend-common/enums';
import { DocumentsFieldValues } from '@realgimm5/frontend-common/interfaces';
import { downloadFile, getDocumentsSchema, getEmptyDocumentFormInput } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  GetPriceListArticleExcelImportTemplateDocument,
  GetPriceListArticleExcelImportTemplateQuery,
} from '../../../gql/RealGimm.Web.PriceListArticle.operation';
import { PriceListArticlesCreateDialogProps } from './PriceListArticles.types';

export const PriceListArticlesCreateDialog = ({ onClose, onSave }: PriceListArticlesCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<DocumentsFieldValues>({
    defaultValues: {
      documents: [getEmptyDocumentFormInput()],
    },
    resolver: yupResolver(getDocumentsSchema(language, t)),
  });

  const handleDownloadTemplate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetPriceListArticleExcelImportTemplateQuery> = await client.query(
      GetPriceListArticleExcelImportTemplateDocument,
      {},
    );
    setLoading(false);

    if (result.data?.priceListArticle.templateOfImportFromExcel.resourceUrl) {
      downloadFile(result.data.priceListArticle.templateOfImportFromExcel.resourceUrl);
    }
  }, [client]);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: DocumentsFieldValues) => {
      onSave(formValues.documents[0]);
    },
    [onSave],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog open title="price_list_article.dialog.create.multiple.title" onClose={openCloseConfirmationDialog}>
      {loading && <Loader />}
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="price_list_article.section_title.import" />
            <SectionTitle
              actions={
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveAltRounded />}
                  onClick={handleDownloadTemplate}
                >
                  {t('price_list_article.action.download_template')}
                </Button>
              }
              value="price_list_article.section_title.upload_articles"
            />
            <Grid2 size={12}>
              <Controller
                name="documents.0"
                control={control}
                render={({ field }) => (
                  <DocumentField
                    {...field}
                    fileTypes={[FileType.ApplicationXls, FileType.ApplicationXlsx]}
                    errors={errors.documents}
                    index={0}
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
