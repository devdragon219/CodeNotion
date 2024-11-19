import { ChevronLeft, Warning } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import {
  CardActions,
  ConfirmationDialog,
  CurrencyField,
  DateField,
  Loader,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { AssetTaxPayments } from '../../../../components/domains/AssetTax/Payments/Payments';
import { AssetTaxActions } from '../../../../components/domains/AssetTaxActions/AssetTaxActions';
import { RawFeature } from '../../../../enums/RawFeature';
import { useFinalizeAssetTaxesMutation, useGetAssetTaxQuery } from '../../../../gql/RealGimm.Web.AssetTax.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { getAssetTaxSubtitleLabel } from '../../../../utils/assetTax/assetTaxUtils';

export default function AssetTax() {
  useFeature(RawFeature.ASST_ASSET_TAX_BASE);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isHistory = useMemo(() => pathname.includes('history'), [pathname]);
  const goBack = useNavigateBack(`/app/tax-management/asset-taxes${isHistory ? '/history' : ''}`);
  const { taxCalculatorId, year, managementSubjectId, expectedDueDate } = useParams();
  const { showError, showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isFinalizeAssetTaxConfirmationDialogOpen, setFinalizeAssetTaxConfirmationDialogOpen] = useState(false);
  const [, finalizeAssetTaxesMutation] = useFinalizeAssetTaxesMutation();
  const [queryState, reexecuteQuery] = useGetAssetTaxQuery({
    variables: {
      taxCalculatorId: String(taxCalculatorId),
      year: Number(year),
      managementSubjectId: Number(managementSubjectId),
      expectedDueDate: String(expectedDueDate),
    },
  });
  const assetTax = useMemo(
    () => queryState.data?.assetTax.singleGroupedPayment,
    [queryState.data?.assetTax.singleGroupedPayment],
  );
  const isDefinitive = useMemo(
    () => assetTax?.payments?.some(({ isDefinitive }) => isDefinitive),
    [assetTax?.payments],
  );

  const handleOpenFinalizeAssetTaxConfirmationDialog = useCallback(() => {
    setFinalizeAssetTaxConfirmationDialogOpen(true);
  }, []);
  const handleCloseFinalizeAssetTaxConfirmationDialog = useCallback(() => {
    setFinalizeAssetTaxConfirmationDialogOpen(false);
  }, []);
  const handleFinalizeAssetTax = useCallback(async () => {
    setLoading(true);
    const result = await finalizeAssetTaxesMutation({
      taxCalculatorId: String(taxCalculatorId),
      taxPaymentIds: assetTax?.payments?.map(({ id }) => id) ?? [],
    });
    setLoading(false);
    if (result.data?.assetTax.setDefinitive.isSuccess) {
      showSnackbar(t('asset_tax.feedback.finalize.single'), 'success');
      handleCloseFinalizeAssetTaxConfirmationDialog();
      reexecuteQuery();
    } else {
      showError(result.data?.assetTax.setDefinitive.validationErrors);
    }
  }, [
    assetTax?.payments,
    finalizeAssetTaxesMutation,
    handleCloseFinalizeAssetTaxConfirmationDialog,
    reexecuteQuery,
    showError,
    showSnackbar,
    t,
    taxCalculatorId,
  ]);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <ConfirmationDialog
        open={isFinalizeAssetTaxConfirmationDialogOpen}
        onClose={handleCloseFinalizeAssetTaxConfirmationDialog}
        type="alert"
        icon={Warning}
        title="asset_tax.dialog.finalize_asset_tax.title"
        actions={
          <>
            <Button color="secondary" onClick={handleCloseFinalizeAssetTaxConfirmationDialog}>
              {t('common.button.cancel')}
            </Button>
            <Button color="primary" variant="contained" onClick={handleFinalizeAssetTax}>
              {t('asset_tax.dialog.finalize_asset_tax.action')}
            </Button>
          </>
        }
      />
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader
        title={[assetTax?.year, assetTax?.managementSubject].filter((it) => !!it).join(' - ')}
        titleTypographyProps={{ variant: 'h2' }}
        subheader={assetTax && t(getAssetTaxSubtitleLabel(assetTax.assetTaxCalculation.taxCalculator))}
        subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.blue[500] }), variant: 'bodyMd' }}
        action={
          <CardActions
            leftActions={
              assetTax && !isDefinitive ? (
                <AssetTaxActions onFinalize={handleOpenFinalizeAssetTaxConfirmationDialog} />
              ) : undefined
            }
          />
        }
      />
      {assetTax && (
        <CardContent>
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="asset_tax.section_title.general_data" />
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DateField
                label={t('asset_tax.field.last_update')}
                value={parseStringToDate(assetTax.lastUpdate)}
                readonly
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DateField
                label={t('asset_tax.field.expected_due_date')}
                value={parseStringToDate(assetTax.expectedDueDate)}
                readonly
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CurrencyField label={t('asset_tax.field.taxable_amount')} value={assetTax.totalTaxableAmount} readonly />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CurrencyField label={t('asset_tax.field.amount')} value={assetTax.totalAmount} readonly />
            </Grid2>
            <SectionTitle value="asset_tax.section_title.payments" />
            <Grid2 size={12}>
              <AssetTaxPayments
                expectedDueDate={String(expectedDueDate)}
                managementSubjectId={Number(managementSubjectId)}
                taxCalculatorId={String(taxCalculatorId)}
                year={Number(year)}
              />
            </Grid2>
          </Grid2>
        </CardContent>
      )}
    </Card>
  );
}
