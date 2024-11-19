import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { EstatePortfolioFormInput } from '../../../interfaces/FormInputs/EstatePortfolio';
import { EstatePortfolioCatalogueItemsStep } from './CatalogueItems/CatalogueItems';
import { EstatePortfolioEstateStep } from './Estate/Estate';
import { EstatePortfolioExportDialogProps } from './EstatePortfolio.types';
import { EstatePortfolioEstateUnitsStep } from './EstateUnits/EstateUnits';

export const EstatePortfolioExportDialog = ({
  catalogueItemIds,
  estateId,
  estateUnitIds,
  onClose,
  onExportSubmit,
}: EstatePortfolioExportDialogProps) => {
  const { activeStep, handleNext, handleBack } = useStepper();
  const [estatePortfolio, setEstatePortfolio] = useState<EstatePortfolioFormInput>({
    estateDocuments: [],
    estateUnitsDocuments: [],
    catalogueItemsDocuments: [],
  });

  return (
    <Dialog fullScreen open title="estate_portfolio.dialog.title" onClose={onClose}>
      <Stepper
        activeStep={activeStep}
        steps={[
          {
            label: 'estate_portfolio.tab.estate',
            children: (
              <EstatePortfolioEstateStep
                estateId={estateId}
                estatePortfolio={estatePortfolio}
                onChange={setEstatePortfolio}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate_portfolio.tab.estate_unit',
            children: (
              <EstatePortfolioEstateUnitsStep
                estatePortfolio={estatePortfolio}
                estateUnitIds={estateUnitIds}
                onChange={setEstatePortfolio}
                onBack={handleBack}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate_portfolio.tab.catalogue',
            children: (
              <EstatePortfolioCatalogueItemsStep
                catalogueItemIds={catalogueItemIds}
                estatePortfolio={estatePortfolio}
                onChange={setEstatePortfolio}
                onBack={handleBack}
                onExport={onExportSubmit}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
