import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency, parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { ContractRevaluationHistoriesDialogProps } from './RevaluationHistories.types';

export const ContractRevaluationHistoriesDialog = ({
  revaluationHistories,
  onClose,
}: ContractRevaluationHistoriesDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="contract.dialog.revaluation_histories" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'contract.field.revaluation_history_since',
            'contract.field.revaluation_history_base_rate',
            'contract.field.revaluation_history_index',
            'contract.field.revaluation_history_amount',
            'contract.field.revaluation_history_rate_with_revaluation',
            'contract.field.revaluation_history_total',
          ]}
          rows={revaluationHistories.map((revaluationHistory) => [
            parseStringToLocalizedDate(revaluationHistory.since, language),
            parseNumberToCurrency(revaluationHistory.baseYearlyRate, language),
            revaluationHistory.indexPercent,
            parseNumberToCurrency(revaluationHistory.revaluationAmount, language),
            parseNumberToCurrency(revaluationHistory.yearlyRateWithRevaluation, language),
            parseNumberToCurrency(
              revaluationHistory.yearlyRateWithRevaluation + revaluationHistory.revaluationAmount,
              language,
            ),
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
