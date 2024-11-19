import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useStepper } from '@realgimm5/frontend-common/hooks';
import { TableState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EstateUnitSplitEstateUnitStep } from '../../../../../components/domains/EstateUnitSplit/EstateUnit/EstateUnit';
import { EstateUnitSplitEstateUnitsStep } from '../../../../../components/domains/EstateUnitSplit/EstateUnits/EstateUnits';
import { EstateUnitSplitRecapStep } from '../../../../../components/domains/EstateUnitSplit/Recap/Recap';
import { RawFeature } from '../../../../../enums/RawFeature';
import { useSplitEstateUnitMutation } from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { EstateUnitSplitFormInput } from '../../../../../interfaces/FormInputs/EstateUnitActions';
import { parseEstateUnitFormInputToEstateUnitInput } from '../../../../../utils/estateUnit/parseEstateUnitFormInput';
import { getEmptyEstateUnitSplitFormInput } from '../../../../../utils/estateUnitActions/initialValues';

export default function EstateUnitSplit() {
  useFeature(RawFeature.ASST_ESTATEUNIT_VARIATION);
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { id } = useParams();
  const { showError, showSnackbar } = useSnackbar();
  const goBack = useNavigateBack(['/app/real-estate/estate-units', id].filter((it) => !!it).join('/'));
  const [, splitEstateUnitMutation] = useSplitEstateUnitMutation();
  const [initialStates, setInitialStates] = useState<Partial<TableState>[]>([]);
  const [loading, setLoading] = useState(false);
  const [estateUnitSplit, setEstateUnitSplit] = useState(getEmptyEstateUnitSplitFormInput());

  const handleSave = useCallback(
    async (estateUnitSplit: EstateUnitSplitFormInput) => {
      setLoading(true);
      const result = await splitEstateUnitMutation({
        estateUnitId: estateUnitSplit.fromEstateUnit!.id,
        estateUnitInputs: estateUnitSplit.toEstateUnits.map((estateUnit) =>
          parseEstateUnitFormInputToEstateUnitInput(estateUnit, true),
        ),
      });
      setLoading(false);
      if (result.data?.estateUnit.split.isSuccess) {
        showSnackbar(t('estate_unit_split.feedback.succeeded'), 'success');
        goBack();
      } else {
        showError(result.data?.estateUnit.split.validationErrors);
      }
    },
    [t, showSnackbar, showError, splitEstateUnitMutation, goBack],
  );

  return (
    <Card>
      {loading && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('estate_unit_split.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        <TableProvider
          key="estate-unit-split"
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
                label: 'estate_unit_split.tab.estate_unit',
                children: (
                  <EstateUnitSplitEstateUnitStep
                    estateUnitId={id ? Number(id) : undefined}
                    estateUnitSplit={estateUnitSplit}
                    onChange={setEstateUnitSplit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_split.tab.estate_units',
                children: (
                  <EstateUnitSplitEstateUnitsStep
                    estateUnitSplit={estateUnitSplit}
                    initialStates={initialStates}
                    onBack={handleBack}
                    onChange={setEstateUnitSplit}
                    onChangeInitialStates={setInitialStates}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit_split.tab.recap',
                children: (
                  <EstateUnitSplitRecapStep
                    estateUnitSplit={estateUnitSplit}
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
