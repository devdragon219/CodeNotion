import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { TicketQuoteArticleFormInput } from '../../../interfaces/FormInputs/Ticket';
import { TicketArticlesTableStep } from './Table/Table';
import { TicketArticleCreateDialogProps } from './TicketArticle.types';
import { TicketArticlesTransferListStep } from './TransferList/TransferList';

export const TicketArticleCreateDialog = ({ priceLists, onClose, onSave }: TicketArticleCreateDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [articles, setArticles] = useState<TicketQuoteArticleFormInput[]>([]);

  return (
    <Dialog fullScreen open title="ticket.dialog.add_price_list_articles" onClose={onClose}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'ticket.tab.price_list',
            children: (
              <TicketArticlesTransferListStep
                articles={articles}
                priceLists={priceLists}
                onChange={setArticles}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'ticket.tab.articles',
            children: (
              <TicketArticlesTableStep
                articles={articles}
                onBack={handleBack}
                onChange={setArticles}
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
