import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Stepper } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useStepper } from '@realgimm5/frontend-common/hooks';
import { TableState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EstateUnitTransformCadastralCoordinatesStep } from '../../../../../components/domains/EstateUnitTransform/CadastralCoordinates/CadastralCoordinates';
import { EstateUnitTransformCadastralUnitStep } from '../../../../../components/domains/EstateUnitTransform/CadastralUnit/CadastralUnit';
import { EstateUnitTransformEstateStep } from '../../../../../components/domains/EstateUnitTransform/Estate/Estate';
import { EstateUnitTransformFromEstateUnitStep } from '../../../../../components/domains/EstateUnitTransform/FromEstateUnit/FromEstateUnit';
import { EstateUnitTransformRecapStep } from '../../../../../components/domains/EstateUnitTransform/Recap/Recap';
import { EstateUnitTransformToEstateUnitStep } from '../../../../../components/domains/EstateUnitTransform/ToEstateUnit/ToEstateUnit';
import { RawFeature } from '../../../../../enums/RawFeature';
import { useTransformEstateUnitMutation } from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { EstateUnitTransformFormInput } from '../../../../../interfaces/FormInputs/EstateUnitActions';
import { parseEstateUnitFormInputToEstateUnitInput } from '../../../../../utils/estateUnit/parseEstateUnitFormInput';
import { getEmptyEstateUnitTransformFormInput } from '../../../../../utils/estateUnitActions/initialValues';

export default function EstateUnitTransform() {
  useFeature(RawFeature.ASST_ESTATEUNIT_VARIATION);
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { id } = useParams();
  const { showError, showSnackbar } = useSnackbar();
  const goBack = useNavigateBack(['/app/real-estate/estate-units', id].filter((it) => !!it).join('/'));
  const [, transformEstateUnitMutation] = useTransformEstateUnitMutation();
  const [initialStates, setInitialStates] = useState<Partial<TableState>[]>([{}, {}]);
  const [loading, setLoading] = useState(false);
  const [estateUnitTransform, setEstateUnitTransform] = useState(getEmptyEstateUnitTransformFormInput());

  const handleChangeInitialState = useCallback(
    (index: number) => (initialState: Partial<TableState>) => {
      setInitialStates((initialStates) => initialStates.map((it, idx) => (idx === index ? initialState : it)));
    },
    [],
  );

  const handleSave = useCallback(
    async (estateUnitTransform: EstateUnitTransformFormInput) => {
      setLoading(true);
      const result = await transformEstateUnitMutation({
        estateUnitId: estateUnitTransform.fromEstateUnit!.id,
        estateUnitInput: parseEstateUnitFormInputToEstateUnitInput(estateUnitTransform.toEstateUnit, true),
      });
      setLoading(false);
      if (result.data?.estateUnit.transform.isSuccess) {
        showSnackbar(t('estate_unit_transform.feedback.succeeded'), 'success');
        goBack();
      } else {
        showError(result.data?.estateUnit.transform.validationErrors);
      }
    },
    [t, showSnackbar, showError, transformEstateUnitMutation, goBack],
  );

  return (
    <Card>
      {loading && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('estate_unit_transform.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        <Stepper
          activeStep={activeStep}
          error={error}
          steps={[
            {
              label: 'estate_unit_transform.tab.initial_estate_unit',
              children: (
                <EstateUnitTransformFromEstateUnitStep
                  estateUnitId={id ? Number(id) : undefined}
                  estateUnitTransform={estateUnitTransform}
                  initialState={initialStates[0]}
                  onChange={setEstateUnitTransform}
                  onChangeInitialState={handleChangeInitialState(0)}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit_transform.tab.estate',
              children: (
                <EstateUnitTransformEstateStep
                  estateUnitTransform={estateUnitTransform}
                  initialState={initialStates[1]}
                  onBack={handleBack}
                  onChange={setEstateUnitTransform}
                  onChangeInitialState={handleChangeInitialState(1)}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit_transform.tab.estate_unit',
              children: (
                <EstateUnitTransformToEstateUnitStep
                  estateUnitTransform={estateUnitTransform}
                  onBack={handleBack}
                  onChange={setEstateUnitTransform}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit_transform.tab.cadastral_unit',
              children: (
                <EstateUnitTransformCadastralUnitStep
                  estateUnitTransform={estateUnitTransform}
                  onBack={handleBack}
                  onChange={setEstateUnitTransform}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit_transform.tab.cadastral_coordinates',
              children: (
                <EstateUnitTransformCadastralCoordinatesStep
                  estateUnitTransform={estateUnitTransform}
                  onBack={handleBack}
                  onChange={setEstateUnitTransform}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit_transform.tab.recap',
              children: (
                <EstateUnitTransformRecapStep
                  estateUnitTransform={estateUnitTransform}
                  onBack={handleBack}
                  onEdit={handleEdit}
                  onSave={handleSave}
                />
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
