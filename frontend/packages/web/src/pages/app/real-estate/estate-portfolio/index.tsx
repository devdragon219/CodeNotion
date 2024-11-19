import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { CardActions, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { EstatePortfolioCatalogueItemsDocuments } from '../../../../components/domains/EstatePortfolio/CatalogueItemsDocuments/CatalogueItemsDocuments';
import { EstatePortfolioEstateDocuments } from '../../../../components/domains/EstatePortfolio/EstateDocuments/EstateDocuments';
import { EstatePortfolioEstateUnitsDocuments } from '../../../../components/domains/EstatePortfolio/EstateUnitsDocuments/EstateUnitsDocuments';
import { EstatePortfolioExportDialog } from '../../../../components/wizards/EstatePortfolio/EstatePortfolio';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  ExportEstatePortfolioDocument,
  ExportEstatePortfolioQuery,
  useGetEstateQuery,
} from '../../../../gql/RealGimm.Web.Estate.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';

export default function EstatePortfolio() {
  const { canRead } = useFeature(RawFeature.ASST_ESTATE_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const client = useClient();
  const tabsLocation = useTabsLocation();
  const { showError, showSnackbar } = useSnackbar();
  const goBack = useNavigateBack(`/app/real-estate/estates/${id}`);
  const [loading, setLoading] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [queryState] = useGetEstateQuery({
    variables: {
      estateId: Number(id),
    },
  });
  const estate = useMemo(() => queryState.data?.estate.estate, [queryState.data]);
  const estateId = useMemo(() => Number(id), [id]);
  const estateUnitIds = useMemo(() => estate?.estateUnits.map(({ id }) => id) ?? [], [estate]);
  const catalogueItemIds = useMemo(() => estate?.catalogueItems.map(({ id }) => id) ?? [], [estate]);

  const handleOpenExportDialog = useCallback(() => {
    setIsExportDialogOpen(true);
  }, []);

  const handleCloseExportDialog = useCallback(() => {
    setIsExportDialogOpen(false);
  }, []);

  const handleExportPortfolio = useCallback(
    async (portfolio: EstatePortfolioFormInput) => {
      const documentsCmisIds = [
        ...portfolio.estateDocuments,
        ...portfolio.estateUnitsDocuments,
        ...portfolio.catalogueItemsDocuments,
      ]
        .map(({ cmisId }) => cmisId ?? null)
        .filter((cmisId) => !!cmisId) as string[];
      setLoading(true);
      const result: OperationResult<ExportEstatePortfolioQuery> = await client.query(ExportEstatePortfolioDocument, {
        estateId: Number(id),
        cmisIds: documentsCmisIds,
      });
      setLoading(false);
      if (result.data?.estate.documents.exportPortfolioToZip.isSuccess) {
        showSnackbar(t('core.feedback.documents_download'), 'info');
        handleCloseExportDialog();
      } else {
        showError(result.data?.estate.documents.exportPortfolioToZip.validationErrors);
      }
    },
    [client, id, showSnackbar, t, showError, handleCloseExportDialog],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      {isExportDialogOpen && (
        <EstatePortfolioExportDialog
          catalogueItemIds={catalogueItemIds}
          estateId={estateId}
          estateUnitIds={estateUnitIds}
          onExportSubmit={handleExportPortfolio}
          onClose={handleCloseExportDialog}
        />
      )}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader
        title={estate && [estate.internalCode, estate.name].filter((it) => !!it).join(' - ')}
        titleTypographyProps={{ variant: 'h2' }}
        action={<CardActions onExport={canRead ? handleOpenExportDialog : undefined} />}
      />
      <CardContent>
        <Tabs
          {...tabsLocation}
          tabs={[
            {
              label: 'estate_portfolio.tab.estate',
              children: estate && <EstatePortfolioEstateDocuments estateId={estateId} />,
            },
            {
              label: 'estate_portfolio.tab.estate_unit',
              children: estate && <EstatePortfolioEstateUnitsDocuments estateUnitIds={estateUnitIds} />,
            },
            {
              label: 'estate_portfolio.tab.catalogue',
              children: estate && <EstatePortfolioCatalogueItemsDocuments catalogueItemIds={catalogueItemIds} />,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
