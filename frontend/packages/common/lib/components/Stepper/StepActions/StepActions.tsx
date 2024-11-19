import { CheckCircleOutline, ChevronLeft } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StepActionsProps } from './StepActions.types';

export const StepActions = ({ completeIcon, completeLabel, onBack, onComplete, onNext }: StepActionsProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: { xs: 1.5, sm: 2.5 }, pb: { xs: 2, sm: 3 } }}>
      {onBack && (
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={onBack}>
          {t('common.button.back')}
        </Button>
      )}
      <Box sx={{ flex: 1 }} />
      {onNext && (
        <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />} onClick={onNext}>
          {t('common.button.continue')}
        </Button>
      )}
      {onComplete && (
        <Button
          color="primary"
          variant="contained"
          type="submit"
          startIcon={completeIcon ?? <CheckCircleOutline />}
          onClick={onComplete}
        >
          {t(completeLabel ?? 'common.button.finish')}
        </Button>
      )}
    </Box>
  );
};
