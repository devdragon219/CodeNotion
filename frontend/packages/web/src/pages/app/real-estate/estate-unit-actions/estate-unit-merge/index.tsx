import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { EstateUnitMergeCadastralCoordinatesStep } from '../../../../../components/domains/EstateUnitMerge/CadastralCoordinates/CadastralCoordinates';
import { EstateUnitMergeCadastralUnitStep } from '../../../../../components/domains/EstateUnitMerge/CadastralUnit/CadastralUnit';
import { EstateUnitMergeEstateStep } from '../../../../../components/domains/EstateUnitMerge/Estate/Estate';
import { EstateUnitMergeEstateUnitStep } from '../../../../../components/domains/EstateUnitMerge/EstateUnit/EstateUnit';
import { EstateUnitMergeEstateUnitsStep } from '../../../../../components/domains/EstateUnitMerge/EstateUnits/EstateUnits';
import { EstateUnitMergeRecapStep } from '../../../../../components/domains/EstateUnitMerge/Recap/Recap';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  GetEstateUnitDocument,
  GetEstateUnitQuery,
  useMergeEstateUnitsMutation,
} from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { EstateUnitMergeFormInput } from '../../../../../interfaces/FormInputs/EstateUnitActions';
import { parseEstateUnitFormInputToEstateUnitInput } from '../../../../../utils/estateUnit/parseEstateUnitFormInput';
import { getEmptyEstateUnitMergeFormInput } from '../../../../../utils/estateUnitActions/initialValues';

export default function EstateUnitMerge() {
  useFeature(RawFeature.ASST_ESTATEUNIT_VARIATION);
  const { t } = useTranslation();
  const client = useClient();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { id } = useParams();
  const { showError, showSnackbar } = useSnackbar();
  const goBack = useNavigateBack(['/app/real-estate/estate-units', id].filter((it) => !!it).join('/'));
  const [, mergeEstateUnitsMutation] = useMergeEstateUnitsMutation();
  const [loading, setLoading] = useState(false);
  const [estateUnitMerge, setEstateUnitMerge] = useState(getEmptyEstateUnitMergeFormInput());

  const fetchEstateUnit = useCallback(async () => {
    if (!id) {
      return;
    }

    setLoading(true);
    const result: OperationResult<GetEstateUnitQuery> = await client.query(GetEstateUnitDocument, {
      estateUnitId: Number(id),
    });
    const estateUnit = result.data?.estateUnit.estateUnit;
    if (estateUnit) {
      setEstateUnitMerge((estateUnitMerge) => ({
        ...estateUnitMerge,
        fromEstateUnits: [estateUnit],
      }));
    }
    setLoading(false);
  }, [id, client]);

  useEffect(() => {
    void fetchEstateUnit();
    // eslint-disable-next-line
  }, []);

  const handleSave = useCallback(
    async (estateUnitMerge: EstateUnitMergeFormInput) => {
      setLoading(true);
      const result = await mergeEstateUnitsMutation({
        estateUnitIds: estateUnitMerge.fromEstateUnits.map(({ id }) => id),
        estateUnitInput: parseEstateUnitFormInputToEstateUnitInput(estateUnitMerge.toEstateUnit, true),
      });
      setLoading(false);
      if (result.data?.estateUnit.merge.isSuccess) {
        showSnackbar(t('estate_unit_merge.feedback.succeeded'), 'success');
        goBack();
      } else {
        showError(result.data?.estateUnit.merge.validationErrors);
      }
    },
    [t, mergeEstateUnitsMutation, showSnackbar, showError, goBack],
  );

  return (
    <Card>
      {loading && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('estate_unit_merge.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent
        sx={activeStep === 0 ? { height: 'calc(100vh - 280px)', overflowY: 'auto', overflowX: 'hidden' } : undefined}
      >
        <TableProvider
          key="estate-unit-transform"
          initialState={{
            sorting: [
              {
                desc: false,
                id: 'internalCode',
              },
            ],
          }}
        >
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'estate_unit_merge.tab.estate_units',
                children: !loading && (
                  <EstateUnitMergeEstateUnitsStep
                    estateUnitId={id ? Number(id) : undefined}
                    estateUnitMerge={estateUnitMerge}
                    onChange={setEstateUnitMerge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_merge.tab.estate',
                children: (
                  <EstateUnitMergeEstateStep
                    estateUnitMerge={estateUnitMerge}
                    onBack={handleBack}
                    onChange={setEstateUnitMerge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_merge.tab.estate_unit',
                children: (
                  <EstateUnitMergeEstateUnitStep
                    estateUnitMerge={estateUnitMerge}
                    onBack={handleBack}
                    onChange={setEstateUnitMerge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_merge.tab.cadastral_unit',
                children: (
                  <EstateUnitMergeCadastralUnitStep
                    estateUnitMerge={estateUnitMerge}
                    onBack={handleBack}
                    onChange={setEstateUnitMerge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_merge.tab.cadastral_coordinates',
                children: (
                  <EstateUnitMergeCadastralCoordinatesStep
                    estateUnitMerge={estateUnitMerge}
                    onBack={handleBack}
                    onChange={setEstateUnitMerge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_merge.tab.recap',
                children: (
                  <EstateUnitMergeRecapStep
                    estateUnitMerge={estateUnitMerge}
                    onBack={handleBack}
                    onEdit={handleEdit}
                    onSave={handleSave}
                  />
                ),
              },
            ]}
          />
        </TableProvider>
      </CardContent>
    </Card>
  );
}
