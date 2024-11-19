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
  GetCostChargeCsvImportTemplateDocument,
  GetCostChargeCsvImportTemplateQuery,
  GetCostChargeExcelImportTemplateDocument,
  GetCostChargeExcelImportTemplateQuery,
} from '../../../gql/RealGimm.Web.CostCharge.operation';
import { CostChargesCreateDialogProps } from './CostCharges.types';

export const CostChargesCreateDialog = ({ onClose, onSave }: CostChargesCreateDialogProps) => {
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

  const handleDownloadCsvTemplate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCostChargeCsvImportTemplateQuery> = await client.query(
      GetCostChargeCsvImportTemplateDocument,
      {},
    );
    setLoading(false);

    if (result.data?.costCharge.templateOfImportFromCsv.resourceUrl) {
      downloadFile(result.data.costCharge.templateOfImportFromCsv.resourceUrl);
    }
  }, [client]);

  const handleDownloadExcelTemplate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCostChargeExcelImportTemplateQuery> = await client.query(
      GetCostChargeExcelImportTemplateDocument,
      {},
    );
    setLoading(false);

    if (result.data?.costCharge.templateOfImportFromExcel.resourceUrl) {
      downloadFile(result.data.costCharge.templateOfImportFromExcel.resourceUrl);
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
    <Dialog open title="cost_charge.dialog.create.multiple.title" onClose={openCloseConfirmationDialog}>
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
            <SectionTitle value="cost_charge.section_title.import" />
            <SectionTitle
              actions={
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveAltRounded />}
                    onClick={handleDownloadCsvTemplate}
                  >
                    {t('cost_charge.action.download_csv_template')}
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveAltRounded />}
                    onClick={handleDownloadExcelTemplate}
                  >
                    {t('cost_charge.action.download_excel_template')}
                  </Button>
                </>
              }
              value="cost_charge.section_title.upload_cost_charges"
            />
            <Grid2 size={12}>
              <Controller
                name="documents.0"
                control={control}
                render={({ field }) => (
                  <DocumentField
                    {...field}
                    fileTypes={[FileType.TextCsv, FileType.ApplicationXls, FileType.ApplicationXlsx]}
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
