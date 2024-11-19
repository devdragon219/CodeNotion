import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, Warning } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import {
  BlockerDialog,
  CardActions,
  ConfirmationDialog,
  Form,
  Loader,
  Tabs,
} from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { downloadFile } from '@realgimm5/frontend-common/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { BillAccountingData } from '../../../../components/domains/Bill/AccountingData/AccountingData';
import { BillGeneralData } from '../../../../components/domains/Bill/GeneralData/GeneralData';
import { BillActions } from '../../../../components/domains/BillActions/BillActions';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  ExportActiveBillsDocument,
  ExportPassiveBillsDocument,
  GenerateBillPdfDocument,
  GenerateBillPdfQuery,
  GetBillDocument,
  GetBillQuery,
  useFinalizeBillsMutation,
  useUpdateBillMutation,
} from '../../../../gql/RealGimm.Web.Bill.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { BillFormInput } from '../../../../interfaces/FormInputs/Bill';
import { parseBillFormInputToBillInput } from '../../../../utils/bill/parseBillFormInput';
import { parseBillToBillFormInput } from '../../../../utils/bill/parseBillFragment';
import { getBillAccountingDataSchema } from '../../../../utils/bill/schemas/accountingData';
import { getBillSchema } from '../../../../utils/bill/schemas/bill';
import { getBillGeneralDataSchema } from '../../../../utils/bill/schemas/generalData';

export default function Bill() {
  const { canRead, canUpdate } = useFeature(RawFeature.PROP_BILL_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id, type } = useParams();
  const { handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const isActive = useMemo(() => type === 'active', [type]);
  const goBack = useNavigateBack(`/app/asset-management/bills/${type}`);
  const [loading, setLoading] = useState(false);
  const [isFinalizeBillConfirmationDialogOpen, setFinalizeBillConfirmationDialogOpen] = useState(false);
  const [, finalizeBillsMutation] = useFinalizeBillsMutation();
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateBillMutation] = useUpdateBillMutation();
  const [bill, setBill] = useState<BillFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchBill = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetBillQuery> = await client.query(GetBillDocument, {
      billId: Number(id),
    });
    setLoading(false);
    if (!result.data?.bill.get) return Promise.reject();
    return parseBillToBillFormInput(result.data.bill.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<BillFormInput>({
    defaultValues: fetchBill,
    resolver: bill ? yupResolver(getBillSchema(isActive, language, t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setBill(formValues as BillFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(bill);
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
    async (bill: BillFormInput) => {
      setLoading(true);
      const result = await updateBillMutation({
        billId: Number(bill.billId),
        input: parseBillFormInputToBillInput(bill),
      });
      setLoading(false);
      if (result.data?.bill.update.isSuccess) {
        showSnackbar(t(`bill.feedback.update.${isActive ? 'active' : 'passive'}`), 'success');
        setReadonly(true);
        const updatedBill = await fetchBill();
        setBill(updatedBill);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.bill.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateBillMutation, showSnackbar, t, isActive, fetchBill, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const handleOpenFinalizeBillConfirmationDialog = useCallback(() => {
    setFinalizeBillConfirmationDialogOpen(true);
  }, []);
  const handleCloseFinalizeBillConfirmationDialog = useCallback(() => {
    setFinalizeBillConfirmationDialogOpen(false);
  }, []);
  const handleFinalizeBill = useCallback(async () => {
    setLoading(true);
    const result = await finalizeBillsMutation({ billIds: Number(id) });
    setLoading(false);
    if (result.data?.bill.finalize.isSuccess) {
      showSnackbar(t('bill.feedback.finalize.single'), 'success');
      handleCloseFinalizeBillConfirmationDialog();
      const updatedBill = await fetchBill();
      setBill(updatedBill);
      setSubmitSuccessful(true);
    } else {
      showError(result.data?.bill.finalize.validationErrors);
    }
  }, [fetchBill, finalizeBillsMutation, handleCloseFinalizeBillConfirmationDialog, id, showError, showSnackbar, t]);

  const handleGeneratePdf = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GenerateBillPdfQuery> = await client.query(GenerateBillPdfDocument, {
      billId: Number(id),
    });
    setLoading(false);
    if (result.data?.bill.generatePdf.value?.resourceUrl) {
      downloadFile(result.data.bill.generatePdf.value.resourceUrl);
    } else {
      showError(result.data?.bill.generatePdf.validationErrors);
    }
  }, [client, id, showError]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <ConfirmationDialog
        open={isFinalizeBillConfirmationDialogOpen}
        onClose={handleCloseFinalizeBillConfirmationDialog}
        type="alert"
        icon={Warning}
        title={`bill.dialog.finalize_bill.title.${isActive ? 'active' : 'passive'}`}
        actions={
          <>
            <Button color="secondary" onClick={handleCloseFinalizeBillConfirmationDialog}>
              {t('common.button.cancel')}
            </Button>
            <Button color="primary" variant="contained" onClick={handleFinalizeBill}>
              {t('bill.dialog.finalize_bill.action')}
            </Button>
          </>
        }
      />
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={bill?.internalCode}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              leftActions={
                <BillActions
                  isTemporary={bill?.isTemporary ?? false}
                  onFinalize={handleOpenFinalizeBillConfirmationDialog}
                  onGenerate={handleGeneratePdf}
                />
              }
              readonly={readonly}
              onCancel={handleCancel}
              onEdit={canUpdate && bill?.isTemporary ? handleEdit : undefined}
              onExport={
                canRead ? handleExport(isActive ? ExportActiveBillsDocument : ExportPassiveBillsDocument) : undefined
              }
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'bill.tab.general_data',
                children: bill && (
                  <BillGeneralData control={control} errors={errors} isBillActive={isActive} readonly={readonly} />
                ),
                error: !readonly && isSubmitted && bill && !getBillGeneralDataSchema(isActive, t).isValidSync(bill),
              },
              {
                label: 'bill.tab.accounting_data',
                children: bill && <BillAccountingData control={control} readonly={readonly} />,
                error: !readonly && isSubmitted && bill && !getBillAccountingDataSchema(language, t).isValidSync(bill),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
