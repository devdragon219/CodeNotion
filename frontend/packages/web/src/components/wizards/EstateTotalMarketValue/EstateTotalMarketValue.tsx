import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { getEmptyEstateTotalMarketValueFormInput } from '../../../utils/estate/initialValues';
import { EstateCoefficientsStep } from './Coefficients/Coefficients';
import { EstateTotalMarketValueDialogProps } from './EstateTotalMarketValue.types';
import { EstateMarketValuesStep } from './MarketValues/MarketValues';
import { EstateSurfaceStep } from './Surface/Surface';

export const EstateTotalMarketValueDialog = ({ input, onClose, onSave }: EstateTotalMarketValueDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [estateTotalMarketValue, setEstateTotalMarketValue] = useState(
    input ?? getEmptyEstateTotalMarketValueFormInput(),
  );

  return (
    <Dialog fullScreen open title="estate.dialog.total_market_value.title" onClose={onClose}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'estate.tab.surface',
            children: (
              <EstateSurfaceStep
                estateTotalMarketValue={estateTotalMarketValue}
                onChange={setEstateTotalMarketValue}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.coefficients',
            children: (
              <EstateCoefficientsStep
                estateTotalMarketValue={estateTotalMarketValue}
                onBack={handleBack}
                onChange={setEstateTotalMarketValue}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.market_values',
            children: (
              <EstateMarketValuesStep
                estateTotalMarketValue={estateTotalMarketValue}
                onBack={handleBack}
                onChange={setEstateTotalMarketValue}
                onError={handleError}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
