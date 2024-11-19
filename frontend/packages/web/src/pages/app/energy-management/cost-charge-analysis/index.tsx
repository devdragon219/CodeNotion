import { Card, CardContent, CardHeader } from '@mui/material';
import { Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisGeneralDataStep } from '../../../../components/domains/CostChargeAnalysis/GeneralData/GeneralData';
import { CostChargeAnalysisResultsStep } from '../../../../components/domains/CostChargeAnalysis/Results/Results';
import { RawFeature } from '../../../../enums/RawFeature';
import { useFeature } from '../../../../hooks/useFeature';
import { getEmptyCostChargeAnalysisFormInput } from '../../../../utils/costChargesAnalysis/initialValues';

export default function CostChargeAnalysis() {
  useFeature(RawFeature.NRGY_COSTCHARGE_BASE);
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [costChargesAnalysis, setCostChargesAnalysis] = useState(getEmptyCostChargeAnalysisFormInput());

  const handleComplete = useCallback(() => {
    setCostChargesAnalysis(getEmptyCostChargeAnalysisFormInput());
    handleBack();
  }, [handleBack]);

  return (
    <Card>
      <CardHeader title={t('cost_charge_analysis.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        <Stepper
          activeStep={activeStep}
          error={error}
          steps={[
            {
              label: 'cost_charge_analysis.tab.general_data',
              children: (
                <CostChargeAnalysisGeneralDataStep
                  costChargesAnalysis={costChargesAnalysis}
                  onChange={setCostChargesAnalysis}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'cost_charge_analysis.tab.results',
              children: (
                <CostChargeAnalysisResultsStep
                  costChargesAnalysis={costChargesAnalysis}
                  onBack={handleBack}
                  onComplete={handleComplete}
                />
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
